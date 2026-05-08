<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\ApiModels\AvailabilityCourtApiModel;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateCourtSlotsWithAvailability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AvailabilityController extends Controller
{
    public function show(Request $request, GenerateCourtSlotsWithAvailability $generateSlots): Response
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        $date = $request->input('date', now()->format('Y-m-d'));

        $courts = $listing->courts()->orderBy('created_at')->get();

        return Inertia::render('availability/availability', [
            'date' => $date,
            'facilityName' => $listing->name,
            'courts' => $courts->map(fn ($court) => AvailabilityCourtApiModel::fromCourtAndSlots(
                $court,
                $generateSlots->generate($listing->opening_time, $listing->closing_time, $date, $court),
            ))->all(),
        ]);
    }
}
