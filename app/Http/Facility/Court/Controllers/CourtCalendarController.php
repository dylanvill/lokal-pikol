<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Court\Requests\CourtCalendarRequest;
use App\Http\Facility\Court\Resources\CourtCalendarResource;
use App\Source\Court\Models\Court;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use Inertia\Inertia;

class CourtCalendarController extends Controller
{
    public function __invoke(Court $court, CourtCalendarRequest $request)
    {
        $court->load(['reservations' => function ($query) {
            $query->whereIn('status', [ReservationStatusEnum::CONFIRMED->value, ReservationStatusEnum::PENDING->value]);
        }, 'reservations.customer', 'courtPricings' => function ($query) {
            $query->orderBy('start_time');
        }]);

        return Inertia::render('facility/courts/courtCalendar', [
            'court' => new CourtCalendarResource($court)
        ]);
    }
}
