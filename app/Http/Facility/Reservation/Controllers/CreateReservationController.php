<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Reservation\Requests\CreateReservationRequest;
use App\Http\Facility\Reservation\Resources\CourtReservationListResource;
use App\Source\Facility\Models\Facility;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateReservationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function show(Request $request)
    {
        $lookupDate = $request->input('date', now()->toDateString());

        $facility = $request->user(GuardEnum::FACILITY->value)->facility;

        $courts = $facility->courts->load([
            'courtPricings',
            'reservations' => function ($query) use ($lookupDate) {
                $query->where('reservation_date', $lookupDate)
                    ->whereNotIn('status', [ReservationStatusEnum::CANCELLED->value, ReservationStatusEnum::ON_HOLD->value]);
            }
        ]);
        return Inertia::render('facility/reservations/create', [
            'courts' => CourtReservationListResource::collection($courts),
            'lookupDate' => $lookupDate,
        ]);
    }

    public function store(CreateReservationRequest $request)
    {

        // Validation and reservation creation logic goes here

        return redirect()->route('facility.reservations.list')->with('success', 'Reservation created successfully.');
    }
}
