<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Reservation\Resources\ReservationListResource;
use App\Source\Facility\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        /** @var Facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();

        $reservations = $facility->reservations()
            ->with(['court', 'customer'])
            ->orderBy('created_at', 'desc')->paginate(50);

        return Inertia::render('facility/reservations', [
            'reservations' => ReservationListResource::collection($reservations),
        ]);
    }
}
