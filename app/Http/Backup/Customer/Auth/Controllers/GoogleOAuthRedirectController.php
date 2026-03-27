<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Source\Authentication\Enums\OAuthProviderEnum;
use Illuminate\Http\Request;
use Laravel\Socialite\Socialite;

class GoogleOAuthRedirectController extends Controller
{
    public function __invoke(Request $request)
    {
        return Socialite::driver(OAuthProviderEnum::GOOGLE->value)->redirect();
    }
}
