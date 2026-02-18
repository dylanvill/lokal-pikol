<?php

namespace App\Http\Facility\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Reservation\Resources\ReservationDashboardCardResource;
use App\Source\Facility\Models\Facility;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        /** @var Facility $facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();
        $reservations = $facility->reservations()->where("status", ReservationStatusEnum::PENDING->value)->get();

        return Inertia::render('facility/dashboard', ['reservations' => ReservationDashboardCardResource::collection($reservations)]);
    }
}
