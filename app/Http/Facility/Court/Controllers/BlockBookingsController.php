<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Court\Resources\CourtBlockBookingResource;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlockBookingsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function show(Request $request)
    {
        /** @var Facility $facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();

        $courts = $facility->courts()->with(['blockBookings' => function ($query) {
            $query->orderBy('day')->orderBy('start_time');
        }])->get();

        return Inertia::render('facility/courts/blockBookings', [
            'courts' => CourtBlockBookingResource::collection($courts)
        ]);
    }
}
