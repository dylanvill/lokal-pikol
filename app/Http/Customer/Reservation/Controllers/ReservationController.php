<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Resources\ReservationResource;
use App\Source\Reservation\Models\Reservation;

class ReservationController extends Controller
{

    public function show(Reservation $reservation)
    {
        return inertia('customer/reservations/reservation', [
            'reservation' => new ReservationResource($reservation->load(['court', 'facility']))
        ]);
    }
}
