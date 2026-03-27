<?php

namespace App\Source\Reservation\Actions\ConfirmReservation;

use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;

class ConfirmReservation
{
    public function confirm(Reservation $reservation): Reservation
    {
        $reservation->status = ReservationStatusEnum::CONFIRMED->value;
        $reservation->save();

        return $reservation;
    }
}
