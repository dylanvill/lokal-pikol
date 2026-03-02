<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Socialite;

class GoogleOAuthCallbackController extends Controller
{
    public function __invoke(Request $request) {
        dd(Socialite::driver('google')->user());
    }
}
