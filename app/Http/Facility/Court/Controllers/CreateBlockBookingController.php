<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Court\Requests\CreateBlockBookingRequest;
use App\Http\Facility\Court\Resources\CourtResource;
use App\Http\Facility\Court\Resources\CreateBlockBookingResource;
use App\Source\Court\Actions\GetCourtBlockBookingSchedules\GetCourtBlockBookingSchedules;
use App\Source\Court\Models\Court;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateBlockBookingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function show(Court $court, CreateBlockBookingRequest $request)
    {
        return Inertia::render('facility/courts/createBlockBooking', [
            'court' => new CreateBlockBookingResource($court)
        ]);
    }
}
