<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Resources\ReservationResource;
use App\Http\Enums\GuardEnum;
use App\Source\Customer\Models\Customer;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{

    public function index(Request $request)
    {
        /** @var Customer */
        $customer = $request->user(GuardEnum::CUSTOMER->value)->getProfileAttribute();

        $customer->load(['reservations', 'reservations.court', 'reservations.facility', 'reservations.fees']);

        return inertia('customer/reservations/reservations', [
            'reservations' => ReservationResource::collection($customer->reservations),
        ]);
    }
}
