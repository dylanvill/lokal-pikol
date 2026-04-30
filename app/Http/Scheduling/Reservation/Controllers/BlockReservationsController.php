<?php

namespace App\Http\Scheduling\Reservation\Controllers;

use App\Http\Scheduling\Court\Resources\CourtResource;
use App\Http\Scheduling\Reservation\Resources\BlockReservationResource;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateSlots;
use App\Source\Scheduling\Court\Models\BlockReservation;
use App\Source\Scheduling\Court\Models\Court;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BlockReservationsController extends Controller
{
    public function show(): Response
    {
        $user = Auth::guard(GuardEnum::FACILITY->value)
            ->user();
        $facilityAdmin = FacilityAdmin::where('user_id', $user->id)
            ->firstOrFail();

        $courts = Court::where('listing_id', $facilityAdmin->listing_id)
            ->with('reservations')
            ->get();

        $blockReservations = BlockReservation::whereIn('court_id', $courts->pluck('id'))
            ->with('court')
            ->get();

        return Inertia::render('reservation/blockReservations', [
            'courts' => CourtResource::collection($courts),
            'blockReservations' => BlockReservationResource::collection($blockReservations),
        ]);
    }
}
