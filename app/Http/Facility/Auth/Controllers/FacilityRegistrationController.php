<?php

namespace App\Http\Facility\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Auth\Requests\FacilityRegistrationRequest;

class FacilityRegistrationController extends Controller
{
    public function __invoke(FacilityRegistrationRequest $request)
    {
        dd($request->all());
    }
}
