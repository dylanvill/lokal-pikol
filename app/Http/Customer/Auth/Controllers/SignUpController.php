<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SignUpController extends Controller
{
    public function show()
    {
        return Inertia::render('customer/signUp');
    }

    public function store()
    {
        return Inertia::render('customer/signUp');
    }
}
