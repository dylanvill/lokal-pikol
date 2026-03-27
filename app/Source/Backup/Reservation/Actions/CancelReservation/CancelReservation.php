<?php

namespace App\Source\Reservation\Actions\CancelReservation;

use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;

class CancelReservation
{
    public function cancel(Reservation $reservation): Reservation
    {
        $reservation->status = ReservationStatusEnum::CANCELLED->value;
        $reservation->save();

        return $reservation;
    }
}
