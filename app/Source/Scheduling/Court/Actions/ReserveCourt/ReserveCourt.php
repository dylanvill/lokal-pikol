<?php

namespace App\Source\Scheduling\Court\Actions\ReserveCourt;

use App\Source\Scheduling\Court\Actions\ReserveCourt\Dtos\ReserveCourtData;
use App\Source\Scheduling\Court\Actions\ReserveCourt\Exceptions\ReservationConflictException;
use App\Source\Scheduling\Court\Actions\ReserveCourt\Rules\CheckReservationOverlap;
use App\Source\Scheduling\Court\Models\Reservation;
use Illuminate\Support\Facades\Validator;

class ReserveCourt
{
    public function reserve(ReserveCourtData $data): Reservation
    {
        $validator = Validator::make(
            ['reservation' => null],
            ['reservation' => new CheckReservationOverlap(
                $data->court->id,
                $data->reservationDate,
                $data->startTime,
                $data->endTime,
            )]
        );

        if ($validator->fails()) {
            throw new ReservationConflictException($validator->errors()->first());
        }

        $reservation = new Reservation;
        $reservation->facility_id = $data->listing->id;
        $reservation->court_id = $data->court->id;
        $reservation->name = $data->name;
        $reservation->notes = $data->notes;
        $reservation->reservation_date = $data->reservationDate;
        $reservation->start_time = $data->startTime;
        $reservation->end_time = $data->endTime;
        $reservation->save();

        return $reservation;
    }
}
