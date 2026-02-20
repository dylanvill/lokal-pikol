<?php

namespace App\Source\Reservation\Actions\CreateReservation;

use App\Source\Reservation\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Reservation\Models\Reservation;

class CreateReservation
{
    public function create(CreateReservationData $data): Reservation
    {
        $reservation = new Reservation();
        $reservation->reservable_id = $data->reservable->id;
        $reservation->reservable_type = $data->reservable->getMorphClass();
        $reservation->facility_id = $data->facilityId;
        $reservation->court_id = $data->courtId;
        $reservation->reservation_date = $data->reservationDate;
        $reservation->start_time = $data->startTime;
        $reservation->end_time = $data->endTime;
        $reservation->status = $data->status;
        $reservation->save();

        return $reservation->refresh();
    }
}
