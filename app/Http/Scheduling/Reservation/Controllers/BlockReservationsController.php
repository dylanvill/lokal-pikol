<?php

namespace App\Http\Scheduling\Reservation\Controllers;

use App\Http\Scheduling\Court\ApiModels\CourtApiModel;
use App\Http\Scheduling\Reservation\ApiModels\BlockReservationApiModel;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateSlots;
use App\Source\Scheduling\Court\Models\BlockReservation;
use App\Source\Scheduling\Court\Shared\Helpers\RangeToCourtSlot;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BlockReservationsController extends Controller
{
    public function show(GenerateSlots $generateSlotsService): Response
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        $slots = $generateSlotsService->generate($listing->opening_time, $listing->closing_time);
        $courts = $listing->courts;

        $rangeToSlots = new RangeToCourtSlot();
        $blockReservations = BlockReservation::whereIn('court_id', $courts->pluck('id'))
            ->with('court')
            ->get()
            ->map(fn(BlockReservation $br) => new BlockReservationApiModel(
                id: $br->uuid,
                name: $br->name,
                courtId: $br->court->uuid,
                courtName: $br->court->name,
                dayOfTheWeek: $br->day_of_the_week,
                blockedSlots: $rangeToSlots->convert($br->start_time, $br->end_time),
            ))
            ->toArray();

        return Inertia::render('reservation/blockReservations', [
            'courts'            => $courts->map(fn($court) => CourtApiModel::fromCourtAndSlots($court, $slots))->toArray(),
            'blockReservations' => $blockReservations,
        ]);
    }
}
