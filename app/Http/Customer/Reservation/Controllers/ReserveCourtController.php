<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Requests\ReserveCourtRequest;
use App\Http\Enums\GuardEnum;
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
use Illuminate\Support\Collection;

class ReserveCourtController extends Controller
{

    public function show(Facility $facility, Court $court)
    {
        return inertia('customer/facilities/reserve');
    }

    public function store(
        Facility $facility,
        Court $court,
        ReserveCourtRequest $request,
        CreateReservation $createReservation,
    ) {
        $range = $this->parseSlotsToRange($request->slots);

        $reservationData = new CreateReservationData(
            customerId: $request->user(GuardEnum::CUSTOMER->value)->getProfileAttribute()->id,
            facilityId: $facility->id,
            courtId: $court->id,
            reservationDate: $request->input('date'),
            startTime: $range->startTime,
            endTime: $range->endTime,
            status: ReservationStatusEnum::ON_HOLD->value,
        );

        $reservation = $createReservation->create($reservationData);
        $this->setReservationFees($reservation, $court);

        return redirect()->route('home')->with('success', 'Court reserved successfully!');
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
        $courtSlots = RangeToSlot::covertMany($court->courtPricings->map(function ($pricing) {
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
                $courtSlot->price
            );

            $setReservationFees->setFee(
                ReservationFeeItemsEnum::SERVICE_FEE->value,
                ReservationFee::SERVICE_FEE_AMOUNT
            );
        }



        return $setReservationFees->save();
    }
}
