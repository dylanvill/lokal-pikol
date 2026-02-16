<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Source\Reservation\Models\Reservation;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function __invoke(Reservation $reservation)
    {
        return Inertia::render('facility/reservations/reservation');
    }
}
