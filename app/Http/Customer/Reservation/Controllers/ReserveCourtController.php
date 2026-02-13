<?php

namespace App\Http\Customer\Reservation\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Reservation\Requests\ReserveCourtRequest;
use App\Http\Customer\Reservation\Requests\ReserveRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReserveCourtController extends Controller
{
    public function show()
    {
        return inertia('customer/reservation/reserve');
    }

    public function store(ReserveCourtRequest $request) {}
}
