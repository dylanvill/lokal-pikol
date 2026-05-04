<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\ApiModels\CourtApiModel;
use App\Http\Scheduling\Court\Requests\CourtsRequest;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateSlots;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourtsController extends Controller
{
    public function show(CourtsRequest $request, GenerateSlots $generateSlotsService): Response
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        $date = $request->input('date', now()->format('Y-m-d'));

        $slots = $generateSlotsService->generate($listing->opening_time, $listing->closing_time);
        $courts = $listing->courts;

        return Inertia::render('courts/courts', [
            'courts' => $courts->map(fn($court) => CourtApiModel::fromCourtAndSlots($court, $slots))->toArray(),
            'date'   => $date,
        ]);
    }
}
