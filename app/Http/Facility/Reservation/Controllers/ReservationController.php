<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Reservation\Resources\ReservationResource;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Reservation\Models\Reservation;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function __invoke(Reservation $reservation)
    {
        $reservation->load(['court', 'reservable', 'fees', 'media' => function ($query) {
            $query->where('collection_name', MediaTypeEnum::RESERVATION_RECEIPTS->value);
        }]);

        return Inertia::render(
            'facility/reservations/reservation',
            ['reservation' => new ReservationResource($reservation)]
        );
    }
}
