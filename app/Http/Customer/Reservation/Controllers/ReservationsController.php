<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Requests\ReservationsRequest;
use App\Http\Customer\Reservation\Resources\ReservationResource;
use App\Http\Enums\GuardEnum;
use App\Source\Customer\Models\Customer;
use Inertia\Inertia;

class ReservationsController extends Controller
{

    public function index(ReservationsRequest $request)
    {
        $active = $request->input('type', 'active') === 'active';

        /** @var Customer */
        $customer = $request->user(GuardEnum::CUSTOMER->value)->getProfileAttribute();

        $reservations = $customer->reservations()
            ->with(['court', 'facility', 'fees'])
            ->when($active, function ($query) {
                $query->where('reservation_date', '>=', now()->toDateString());
            })
            ->when(!$active, function ($query) {
                $query->where('reservation_date', '<', now()->toDateString());
            })
            ->orderBy('reservation_date')
            ->paginate(15);


        return inertia('customer/reservations/reservations', [
            'reservations' => Inertia::scroll(fn() => ReservationResource::collection($reservations))
        ]);
    }
}
