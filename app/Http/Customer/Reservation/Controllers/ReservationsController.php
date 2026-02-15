<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{

    public function index(Request $request)
    {
        return inertia('customer/reservations/reservations');
    }
}
