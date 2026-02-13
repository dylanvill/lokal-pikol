<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Requests\ReserveCourtRequest;
use App\Http\Enums\GuardEnum;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\CourtSlot;
use App\Source\Court\Actions\CourtSlotConversion\SlotsToRange;
use App\Source\Court\Models\Court;
use App\Source\Facility\Models\Facility;
use App\Source\Reservation\Actions\CreateReservation\CreateReservation;
use App\Source\Reservation\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Reservation\Actions\SetReservationFees\SetReservationFees;
use App\Source\Reservation\Enums\ReservationStatusEnum;

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
        SlotsToRange $slotsToRange,
        CreateReservation $createReservation,
    ) {
        // dd($request->all());

        $convertData = array_map(function ($slot) {
            $data = explode('-', $slot);
            return new CourtSlot(
                startTime: $data[0],
                endTime: $data[1],
            );
        }, $request->slots);

        $range = $slotsToRange->convert($convertData);


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
        $setReservationFees = new SetReservationFees($reservation);
        $setReservationFees->setFee(
            "test",
            500
        )->save();

        return redirect()->route('home')->with('success', 'Court reserved successfully!');
    }
}
