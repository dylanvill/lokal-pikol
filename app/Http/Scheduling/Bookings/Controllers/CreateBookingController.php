<?php

namespace App\Http\Scheduling\Bookings\Controllers;

use App\Http\Shared\Contracts\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CreateBookingController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('bookings/createBooking');
    }
}
