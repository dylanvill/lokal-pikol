<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Scheduling\Auth\Requests\ResetPasswordRequest;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function store(ResetPasswordRequest $request): RedirectResponse
    {
        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function (User $user, string $password) use ($request) {
                $user->forceFill(['password' => Hash::make($password)])
                    ->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));

                Auth::guard(GuardEnum::FACILITY->value)->login($user);
                $request->session()->regenerate();
            }
        );

        return $status === Password::PasswordReset
            ? redirect()->route(Routes::getFullName(Routes::COURTS))
            : back()->withErrors(['email' => __($status)]);
    }
}
