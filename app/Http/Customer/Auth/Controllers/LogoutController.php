<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function __invoke()
    {
        Auth::guard(GuardEnum::CUSTOMER->value)->logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        return redirect()->route('home');
    }
}
