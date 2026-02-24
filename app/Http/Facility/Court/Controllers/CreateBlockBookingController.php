<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Court\Requests\CreateBlockBookingRequest;
use App\Http\Facility\Court\Resources\CreateBlockBookingResource;
use App\Source\Court\Models\Court;
use Inertia\Inertia;

class CreateBlockBookingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function show(Court $court)
    {
        return Inertia::render('facility/courts/createBlockBooking', [
            'court' => new CreateBlockBookingResource($court)
        ]);
    }

    /**
     * Handle the incoming request.
     */
    public function store(Court $court, CreateBlockBookingRequest $request)
    {
        return Inertia::flash('success', 'Block booking created successfully.')->back();
    }
}
