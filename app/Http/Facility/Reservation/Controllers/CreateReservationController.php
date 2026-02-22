<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Reservation\Requests\CreateReservationRequest;
use App\Http\Facility\Reservation\Resources\CourtReservationListResource;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\CourtSlot;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\Range;
use App\Source\Court\Actions\CourtSlotConversion\RangeToSlot;
use App\Source\Court\Actions\CourtSlotConversion\SlotsToRange;
use App\Source\Court\Models\Court;
use App\Source\Facility\Models\Facility;
use App\Source\Reservation\Actions\CreateReservation\CreateReservation;
use App\Source\Reservation\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Reservation\Actions\SetReservationFees\SetReservationFees;
use App\Source\Reservation\Enums\ReservationFeeItemsEnum;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Models\ReservationFee;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class CreateReservationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function show(Request $request)
    {
        $lookupDate = $request->input('date', now()->toDateString());

        $facility = $request->user(GuardEnum::FACILITY->value)->facility;

        $courts = $facility->courts->load([
            'courtPricings',
            'reservations' => function ($query) use ($lookupDate) {
                $query->whereDate('reservation_date', $lookupDate)
                    ->whereNotIn('status', [ReservationStatusEnum::CANCELLED->value, ReservationStatusEnum::ON_HOLD->value]);
            }
        ]);
        return Inertia::render('facility/reservations/create', [
            'courts' => CourtReservationListResource::collection($courts),
            'lookupDate' => $lookupDate,
        ]);
    }

    public function store(CreateReservationRequest $request, CreateReservation $createReservation)
    {
        $range = $this->parseSlotsToRange($request->slots);

        $facility = $request->user(GuardEnum::FACILITY->value)->facility;
        $court = Court::where('uuid', $request->input('courtId'))->first();

        $reservationData = new CreateReservationData(
            reservable: $facility,
            facilityId: $facility->id,
            courtId: $court->id,
            reservationDate: $request->date,
            startTime: $range->startTime,
            endTime: $range->endTime,
            status: ReservationStatusEnum::CONFIRMED->value,
        );

        $reservation = $createReservation->create($reservationData);

        $reservationDate = $reservation->reservation_date->format('l, F j, Y');
        $startTime = date('g:i A', strtotime($reservation->start_time));
        $endTime = date('g:i A', strtotime($reservation->end_time));

        $message = "Reservation for {$court->name} on {$reservationDate} from {$startTime} to {$endTime} has been created successfully.";

        return Inertia::flash("{$request->courtId}-success", $message)->back();
    }



    protected function parseSlotsToRange(array $slots): Range
    {
        $slotsToRange = new SlotsToRange();
        $slots = array_map(function ($slot) {
            $data = explode('-', $slot);
            return new CourtSlot(
                startTime: $data[0],
                endTime: $data[1],
            );
        }, $slots);

        return $slotsToRange->convert($slots);
    }

    /**
     * @return Collection<ReservationFee>
     */
    protected function setReservationFees(Reservation $reservation, Court $court): Collection
    {
        $court->load([
            'courtPricings' => function ($query) {
                $query->orderBy('start_time');
            }
        ]);
        $courtSlots = RangeToSlot::convertMany($court->courtPricings->map(function ($pricing) {
            return new Range(
                startTime: $pricing->start_time,
                endTime: $pricing->end_time,
                price: $pricing->price
            );
        })->all());

        $reservationSlots = RangeToSlot::convert(new Range(
            startTime: $reservation->start_time,
            endTime: $reservation->end_time,
        ));

        $setReservationFees = new SetReservationFees($reservation);

        foreach ($reservationSlots as $reservedSlot) {
            $courtSlot = array_find($courtSlots, function ($courtSlot) use ($reservedSlot) {
                return $courtSlot->startTime === $reservedSlot->startTime
                    && $courtSlot->endTime === $reservedSlot->endTime;
            });
            $setReservationFees->setFee(
                "{$reservedSlot->startTime}-{$reservedSlot->endTime}",
                $courtSlot->price,
                ReservationFeeItemsEnum::HOURLY_RATE_DESCRIPTION->value
            );

            $setReservationFees->setFee(
                ReservationFeeItemsEnum::SERVICE_FEE->value,
                ReservationFee::SERVICE_FEE_AMOUNT
            );
        }



        return $setReservationFees->save();
    }
}
