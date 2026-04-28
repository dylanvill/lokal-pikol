<?php

namespace App\Http\Scheduling\Booking\Controllers;

use App\Http\Shared\Contracts\Controller;
use Inertia\Inertia;
use Inertia\Response;

class BookingsController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('bookings/bookings');
    }
}
