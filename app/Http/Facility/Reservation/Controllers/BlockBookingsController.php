<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
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
        return Inertia::render('facility/reservations/blockBookings');
    }
}
