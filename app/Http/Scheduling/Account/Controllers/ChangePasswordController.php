<?php

namespace App\Http\Scheduling\Account\Controllers;

use App\Http\Scheduling\Account\Requests\ChangePasswordRequest;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ChangePasswordController extends Controller
{
    private const SUCCESS_MESSAGE_KEY = 'account-changes-saved';

    public function store(ChangePasswordRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();

        if (! Hash::check($request->currentPassword, $user->password)) {
            return back()->withErrors(['currentPassword' => 'The current password is incorrect.']);
        }

        $user->update(['password' => Hash::make($request->password)]);

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, 'Password updated');

        return redirect()->back();
    }
}
