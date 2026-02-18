<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Resources\ReservationResource;
use App\Http\Enums\GuardEnum;
use App\Source\Customer\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationsController extends Controller
{

    public function index(Request $request)
    {
        /** @var Customer */
        $customer = $request->user(GuardEnum::CUSTOMER->value)->getProfileAttribute();

        $reservations = $customer->reservations()
            ->with(['court', 'facility', 'fees'])
            ->orderByDesc('created_at')
            ->paginate(5);
 

        return inertia('customer/reservations/reservations', [
            'reservations' => Inertia::scroll(fn() => ReservationResource::collection($reservations))
        ]);
    }
}
