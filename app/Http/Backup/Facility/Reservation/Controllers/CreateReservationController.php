<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Reservation\Requests\CreateReservationRequest;
use App\Http\Facility\Reservation\Requests\ShowCreateReservationRequest;
use App\Http\Facility\Reservation\Resources\CourtReservationListResource;
use App\Http\Facility\Reservation\Resources\CustomerResource;
use App\Source\Court\Models\Court;
use App\Source\Customer\Models\Customer;
use App\Source\Reservation\Actions\CreateReservation\CreateReservation;
use App\Source\Reservation\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\SlotsToRange;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateReservationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function show(ShowCreateReservationRequest $request)
    {
        $lookupDate = $request->input('date', now()->toDateString());
        $searchString = $request->input('search', '');

        $facility = $request->user(GuardEnum::FACILITY->value)->facility;

        $courts = $facility->courts->load([
            'courtPricings',
            'reservations' => function ($query) use ($lookupDate) {
                $query->whereDate('reservation_date', $lookupDate)
                    ->whereNotIn('status', [ReservationStatusEnum::CANCELLED->value, ReservationStatusEnum::ON_HOLD->value]);
            }
        ]);

        $customers = [];

        if (!empty($searchString)) {
            $lower = strtolower($searchString);
            $customers = Customer::whereRaw('LOWER(CONCAT(first_name, " ", last_name)) like ?', ["%{$lower}%"])
                ->orWhere('email', $searchString)
                ->get();
        }


        return Inertia::render('facility/reservations/create', [
            'courts' => CourtReservationListResource::collection($courts),
            'lookupDate' => $lookupDate,
            'customers' => CustomerResource::collection($customers),
        ]);
    }

    public function store(CreateReservationRequest $request, CreateReservation $createReservation)
    {
        $range = $this->parseSlotsToRange($request->slots);

        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();
        $customer = Customer::where('uuid', $request->customer)->first();
        $court = Court::where('uuid', $request->input('courtId'))->first();

        $reservationData = new CreateReservationData(
            reservable: $customer,
            facilityId: $facility->id,
            courtId: $court->id,
            reservationDate: $request->date,
            startTime: $range->startTime,
            endTime: $range->endTime,
            status: ReservationStatusEnum::CONFIRMED->value,
            customTitle: null,
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
        $slots = array_map(function ($slot) {
            $data = explode('-', $slot);
            return new CourtSlot(
                startTime: $data[0],
                endTime: $data[1],
            );
        }, $slots);

        return SlotsToRange::convert($slots);
    }
}
