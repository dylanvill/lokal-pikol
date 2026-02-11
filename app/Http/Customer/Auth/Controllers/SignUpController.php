<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Auth\Requests\SignUpRequest;
use Inertia\Inertia;

class SignUpController extends Controller
{
    public function show()
    {
        return Inertia::render('customer/signUp');
    }

    public function store(SignUpRequest $request)
    {
        return Inertia::render('customer/signUp');
    }
}