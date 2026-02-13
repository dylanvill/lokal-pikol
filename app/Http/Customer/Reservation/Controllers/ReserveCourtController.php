<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Requests\ReserveCourtRequest;
use App\Source\Court\Models\Court;
use App\Source\Facility\Models\Facility;

class ReserveCourtController extends Controller
{
    public function show(Facility $facility, Court $court)
    {
        return inertia('customer/facilities/reserve');
    }

    public function store(Facility $facility, Court $court, ReserveCourtRequest $request) {
        dd($request->all());
    }
}
