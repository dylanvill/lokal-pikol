<?php

namespace App\Http\Facility\Auth\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{

    public function __invoke()
    {
        Auth::guard('client')->logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();

        return redirect()->route('client.auth.show');
    }
}
