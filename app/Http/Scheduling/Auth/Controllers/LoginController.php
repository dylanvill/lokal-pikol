<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Scheduling\Auth\Requests\LoginRequest;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('auth/login');
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->only('email', 'password');
        $credentials['role'] = GuardEnum::FACILITY->value;

        if (Auth::guard(GuardEnum::FACILITY->value)->attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended(route('home'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
