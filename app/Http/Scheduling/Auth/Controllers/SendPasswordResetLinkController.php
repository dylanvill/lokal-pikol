<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Scheduling\Auth\Requests\ForgotPasswordRequest;
use App\Http\Shared\Contracts\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Password;

class SendPasswordResetLinkController extends Controller
{
    public function store(ForgotPasswordRequest $request): RedirectResponse
    {
        $status = Password::sendResetLink(['email' => $request->email]);

        return $status === Password::ResetLinkSent
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }
}
