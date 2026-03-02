<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Source\Authentication\Actions\CreateGoogleOAuthUser\CreateGoogleOAuthUser;
use App\Source\Authentication\Actions\CreateGoogleOAuthUser\Dtos\CreateGoogleOAuthUserData;
use App\Source\Authentication\Enums\OAuthProviderEnum;
use App\Source\Authentication\Enums\UserRoles;
use App\Source\Authentication\Models\AuthenticationProvider;
use App\Source\Customer\Actions\CreateCustomer\CreateCustomer;
use App\Source\Customer\Actions\CreateCustomer\Dtos\CreateCustomerData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;

class GoogleOAuthCallbackController extends Controller
{
    public function __invoke(Request $request, CreateGoogleOAuthUser $createGoogleOAuthUser, CreateCustomer $createCustomer)
    {
        $googleUser = Socialite::driver(OAuthProviderEnum::GOOGLE->value)->user();

        $auth = AuthenticationProvider::where('name', OAuthProviderEnum::GOOGLE->value)
            ->where('email', $googleUser->getEmail())
            ->first();

        if (empty($auth)) {
            $name = explode(' ', $googleUser->getName(), 2);
            $user = $createGoogleOAuthUser->create(
                new CreateGoogleOAuthUserData(
                    email: $googleUser->getEmail(),
                    provider: OAuthProviderEnum::GOOGLE,
                    authenticationId: $googleUser->getId(),
                    role: UserRoles::CUSTOMER,
                    providerConfig: [],
                )
            );

            $createCustomer->create(
                new CreateCustomerData(
                    userId: $user->id,
                    firstName: $name[0] ?? '',
                    lastName: $name[1] ?? '',
                    email: $user->email,
                    phone: null,
                )
            );
        } else {
            $user = $auth->user;
        }

        Auth::guard(GuardEnum::CUSTOMER->value)->login($user);
        $request->session()->regenerate();

        return redirect()->route('home');
    }
}
