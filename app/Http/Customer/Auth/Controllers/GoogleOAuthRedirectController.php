<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Socialite;

class GoogleOAuthRedirectController extends Controller
{
    public function __invoke(Request $request)
    {
        return Socialite::driver('google')->redirect();
    }
}
