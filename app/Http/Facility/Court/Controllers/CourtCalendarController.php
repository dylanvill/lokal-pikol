<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Court\Resources\CourtCalendarResource;
use App\Source\Court\Models\Court;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourtCalendarController extends Controller
{
    public function __invoke(Court $court, Request $request)
    {
        $court->load(['reservations' => function ($query) use ($request) {
            $query->whereIn('status', [ReservationStatusEnum::CONFIRMED->value, ReservationStatusEnum::PENDING->value]);
        }, 'reservations.customer', 'courtPricings' => function ($query) {
            $query->orderBy('start_time');
        }]);

        return Inertia::render('facility/courts/courtCalendar', [
            'court' => new CourtCalendarResource($court),
        ]);
    }
}
