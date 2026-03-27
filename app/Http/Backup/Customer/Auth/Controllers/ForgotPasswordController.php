<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Customer\Auth\Requests\RequestResetPasswordRequest;
use App\Source\Customer\Models\Customer;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function show()
    {
        return Inertia::render('customer/auth/forgotPassword');
    }

    public function send(RequestResetPasswordRequest $request)
    {
        $customer = Customer::where('email', $request->email)->first();

        if (!empty($customer)) {
            Password::sendResetLink(
                $request->only('email')
            );
        }

        return Inertia::flash('forgot-password-success', 'Reset password instructions have been sent to your email')->back();
    }
}
