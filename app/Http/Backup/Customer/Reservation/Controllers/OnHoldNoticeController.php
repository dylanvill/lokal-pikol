<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Customer\Reservation\Resources\ReservationResource;
use App\Source\Reservation\Models\Reservation;

class OnHoldNoticeController extends Controller
{

    public function __invoke(Reservation $reservation)
    {
        return inertia('customer/reservations/onHoldReservationNotice', [
            'reservation' => new ReservationResource($reservation->load(['court', 'facility']))
        ]);
    }
}
