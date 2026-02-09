<?php

namespace App\Http\Facility\Auth\Controllers;

use App\Http\Facility\Auth\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function show()
    {
        return Inertia::render('facility/login');
    }

    public function login(LoginRequest $request)
    {

        $authData = array_merge(
            $request->only('email', 'password'),
            ['role' => 'facility']
        );

        if (Auth::guard('facility')->attempt($authData)) {
            $request->session()->regenerate();

            return redirect()->intended(route('facility.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
}
