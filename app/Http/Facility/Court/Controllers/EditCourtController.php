<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Court\Resources\EditCourtResource;
use App\Source\Court\Models\Court;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use Inertia\Inertia;

class EditCourtController extends Controller
{
    public function show(Court $court)
    {

        $court->withPhotos();
        $court->load(['reservations' => function ($query) {
            $query->whereIn('status', [ReservationStatusEnum::CONFIRMED->value, ReservationStatusEnum::PENDING->value]);
        }, 'reservations.reservable', 'courtPricings' => function ($query) {
            $query->orderBy('start_time');
        }]);

        return Inertia::render('facility/courts/edit', [
            'court' => new EditCourtResource($court)
        ]);
    }
}
