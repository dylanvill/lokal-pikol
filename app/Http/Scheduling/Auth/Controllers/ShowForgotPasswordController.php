<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ShowForgotPasswordController extends Controller
{
    public function show(): Response|RedirectResponse
    {
        if (Auth::guard(GuardEnum::FACILITY->value)->check()) {
            return redirect()->route(Routes::getFullName(Routes::COURTS));
        }

        return Inertia::render('auth/forgot-password', [
            'status' => session('status'),
        ]);
    }
}
