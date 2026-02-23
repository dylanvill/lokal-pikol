<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Requests\ReserveCourtRequest;
use App\Http\Customer\Reservation\Resources\ReservationResource;
use App\Http\Enums\GuardEnum;
use App\Source\Court\Models\Court;
use App\Source\Facility\Models\Facility;
use App\Source\Reservation\Actions\CreateReservation\CreateReservation;
use App\Source\Reservation\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Reservation\Actions\SetReservationFees\SetReservationFees;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\SlotsToRange;

class ReserveCourtController extends Controller
{

    public function show(Reservation $reservation)
    {
        return inertia('customer/facilities/reserve', [
            'reservation' => new ReservationResource($reservation->load(['court', 'facility'])),
        ]);
    }

    public function store(
        Facility $facility,
        Court $court,
        ReserveCourtRequest $request,
        CreateReservation $createReservation,
        SetReservationFees $setReservationFees,
    ) {
        $range = $this->parseSlotsToRange($request->input('slots'));

        $reservationData = new CreateReservationData(
            reservable: $request->user(GuardEnum::CUSTOMER->value)->getProfileAttribute(),
            facilityId: $facility->id,
            courtId: $court->id,
            reservationDate: $request->input('date'),
            startTime: $range->startTime,
            endTime: $range->endTime,
            status: ReservationStatusEnum::ON_HOLD->value,
        );

        $reservation = $createReservation->create($reservationData);
        $setReservationFees->set($reservation, $court);

        return redirect()->route('reservation.on-hold.show', [
            'facility' => $facility->uuid,
            'court' => $court->uuid,
            'reservation' => $reservation->uuid,
        ]);
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
}
