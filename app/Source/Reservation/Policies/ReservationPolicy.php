<?php

namespace App\Source\Reservation\Policies;

use App\Source\Reservation\Models\Reservation;
use App\Source\Authentication\Models\User;
use Illuminate\Auth\Access\Response;

class ReservationPolicy
{
    public function customerCanView(User $user, Reservation $reservation): Response
    {
        $customer = $user->getProfileAttribute();

        return $customer->id === $reservation->reservable->id && $reservation->reservable_type === $customer->getMorphClass()
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
