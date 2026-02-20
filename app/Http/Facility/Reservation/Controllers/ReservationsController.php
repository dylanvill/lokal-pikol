<?php

namespace App\Http\Facility\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Reservation\Resources\ReservationListResource;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        /** @var Facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();

        $reservations = $facility->customerReservations()
            ->with([
                'court',
                'reservable',
                'fees',
                'media' => function ($query) {
                    $query->where('collection_name', MediaTypeEnum::RESERVATION_RECEIPTS->value);
                }
            ])
            ->orderBy('reservation_date', 'desc')->paginate(25);

        return Inertia::render('facility/reservations/reservations', [
            'reservations' => ReservationListResource::collection($reservations),
        ]);
    }
}
