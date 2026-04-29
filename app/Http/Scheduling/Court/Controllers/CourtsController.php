<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateSlots;
use App\Source\Scheduling\Court\Models\Court;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourtsController extends Controller
{
    public function show(Request $request, GenerateSlots $generateSlots): Response
    {
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $facilityAdmin = FacilityAdmin::where('user_id', $user->id)->firstOrFail();
        $listing = Listing::findOrFail($facilityAdmin->listing_id);

        $date = $request->query('date', now()->toDateString());

        $courts = Court::where('listing_id', $listing->id)
            ->with(['reservations' => fn ($q) => $q->whereDate('reservation_date', $date)])
            ->get();

        $courtsData = $courts->map(fn ($court) => [
            'id'    => $court->id,
            'name'  => $court->name,
            'slots' => $generateSlots->generate($listing->opening_time, $listing->closing_time, $court->reservations),
        ]);

        return Inertia::render('courts/courts', [
            'courts' => $courtsData,
        ]);
    }
}
