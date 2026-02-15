<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Source\Reservation\Models\Reservation;

class ReservationController extends Controller
{

    public function show(Reservation $reservation)
    {
        return inertia('customer/reservations/reservation');
    }
}
