<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\Requests\CourtsRequest;
use App\Http\Scheduling\Court\Resources\CourtResource;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Court\Models\Court;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourtsController extends Controller
{
    public function show(CourtsRequest $request): Response
    {
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $facilityAdmin = FacilityAdmin::where('user_id', $user->id)->firstOrFail();
        $listing = Listing::findOrFail($facilityAdmin->listing_id);

        $date = $request->input('date', now()->format("Y-m-d"));

        $courts = Court::where('listing_id', $listing->id)
            ->with([
                'listing',
                'reservations' => fn($q) => $q->whereDate('reservation_date', $date),
            ])
            ->get();

        return Inertia::render('courts/courts', [
            'courts' => CourtResource::collection($courts),
            'date' => $date
        ]);
    }
}
