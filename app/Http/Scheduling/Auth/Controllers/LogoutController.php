<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        Auth::guard(GuardEnum::FACILITY->value)->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route(Routes::getFullName(Routes::LOGIN));
    }
}
