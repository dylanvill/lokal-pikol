<?php

namespace App\Http\Directory\Controllers;

use App\Http\Scheduling\Court\ApiModels\AvailabilityCourtApiModel;
use App\Http\Shared\Contracts\Controller;
use App\Source\Directory\Models\Listing;
// Cross-domain call: Directory HTTP → Scheduling Source (scheduling business logic, read-only)
use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateCourtSlotsWithAvailability;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ListingScheduleController extends Controller
{
    public function show(Request $request, GenerateCourtSlotsWithAvailability $generateSlots, string $slug): Response
    {
        $listing = Listing::with('socialLinks')
            ->where('slug', $slug)
            ->where('is_scheduling_enabled', true)
            ->firstOrFail();

        $date = $request->input('date', now()->format('Y-m-d'));

        $courts = $listing->courts()->orderBy('created_at')->get();

        return Inertia::render('schedule', [
            'date' => $date,
            'listing' => [
                'name' => $listing->name,
                'socialLinks' => $listing->socialLinks,
            ],
            'courts' => $courts->map(fn ($court) => AvailabilityCourtApiModel::fromCourtAndSlots(
                $court,
                $generateSlots->generate($listing->opening_time, $listing->closing_time, $date, $court),
            ))->all(),
        ]);
    }
}
