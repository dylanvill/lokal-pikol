<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Customer\Auth\Requests\RequestResetPasswordRequest;
use App\Source\Authentication\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('customer/auth/resetPassword', [
            'token' => $request->token,
            'email' => $request->email,
        ]);
    }

    public function reset(RequestResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PasswordReset) {
            Inertia::flash('reset-password-success', 'Your password has been reset successfully. You can now log in with your new password.');
            return redirect()->route('login');
        }

        return back()->withErrors(['password' => [__($status)]]);
    }
}
