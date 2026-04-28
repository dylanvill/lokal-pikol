<?php

namespace App\Source\Scheduling\Court\Actions\CreateReservation;

use App\Source\Scheduling\Court\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Scheduling\Court\Models\Reservation;
use Illuminate\Support\Str;

class CreateReservation
{
    public function create(CreateReservationData $data): Reservation
    {
        $reservation = new Reservation();
        $reservation->uuid = Str::uuid();
        $reservation->facility_id = $data->facilityAdmin->id;
        $reservation->court_id = $data->court->id;
        $reservation->name = $data->name;
        $reservation->reservation_date = $data->reservationDate;
        $reservation->start_time = $data->startTime;
        $reservation->end_time = $data->endTime;
        $reservation->save();

        return $reservation;
    }
}
