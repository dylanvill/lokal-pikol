<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Customer\Reservation\Resources\ReservationResource;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReservationController extends Controller
{

    public function show(Request $request, Reservation $reservation)
    {
        return inertia('customer/reservations/reservation', [
            'reservation' => new ReservationResource($reservation->load(['court', 'facility']))
        ]);
    }
}
