<?php

namespace App\Http\Scheduling\Bookings\Controllers;

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
