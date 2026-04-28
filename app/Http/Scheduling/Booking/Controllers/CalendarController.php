<?php

namespace App\Http\Scheduling\Booking\Controllers;

use App\Http\Shared\Contracts\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('bookings/calendar');
    }
}
