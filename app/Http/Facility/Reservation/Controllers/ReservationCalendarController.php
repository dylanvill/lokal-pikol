<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;

class ReservationCalendarController extends Controller
{
    public function __invoke()
    {
        return inertia('facility/reservations/reservationCalendar');
    }
}
