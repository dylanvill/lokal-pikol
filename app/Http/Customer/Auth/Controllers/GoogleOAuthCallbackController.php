<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Source\Authentication\Actions\CreateGoogleOAuthUser\CreateGoogleOAuthUser;
use App\Source\Authentication\Actions\CreateGoogleOAuthUser\Dtos\CreateGoogleOAuthUserData;
use App\Source\Authentication\Actions\CreateUser\CreateUser;
use App\Source\Authentication\Actions\CreateUser\Dtos\CreateUserData;
use App\Source\Authentication\Enums\OAuthProviderEnum;
use App\Source\Authentication\Enums\UserRoles;
use App\Source\Authentication\Models\User;
use App\Source\Customer\Actions\CreateCustomer\CreateCustomer;
use App\Source\Customer\Actions\CreateCustomer\Dtos\CreateCustomerData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class GoogleOAuthCallbackController extends Controller
{

    public function __construct(
        protected CreateGoogleOAuthUser $createGoogleOAuthUser,
        protected CreateCustomer $createCustomer,
        protected CreateUser $createUser
    ) {}

    public function __invoke(
        Request $request
    ) {
        $googleUser = Socialite::driver(OAuthProviderEnum::GOOGLE->value)->user();

        $user = User::where('email', $googleUser->getEmail())
            ->where('role', UserRoles::CUSTOMER->value)
            ->first();

        if (empty($user)) {
            $user = $this->createUser->create(
                new CreateUserData(
                    email: $googleUser->getEmail(),
                    password: null,
                    role: UserRoles::CUSTOMER,
                )
            );

            $name = explode(' ', $googleUser->getName(), 2);
            $this->createCustomer->create(
                new CreateCustomerData(
                    userId: $user->id,
                    firstName: $name[0] ?? '',
                    lastName: $name[1] ?? '',
                    email: $user->email,
                    phone: null,
                )
            );
        }

        $this->createAuthenticationProvider($user, $googleUser);

        if (empty($user->email_verified_at)) {
            $user->email_verified_at = now();
            $user->save();
        }

        Auth::guard(GuardEnum::CUSTOMER->value)->login($user, true);
        $request->session()->regenerate();

        return redirect()->route('home');
    }

    protected function createAuthenticationProvider(
        User $user,
        SocialiteUser $googleUser,
    ) {
        $authProvider = $user->authenticationProviders()
            ->where('name', OAuthProviderEnum::GOOGLE->value)
            ->where('email', $googleUser->getEmail())
            ->first();

        if (empty($authProvider)) {
            $this->createGoogleOAuthUser->create(
                new CreateGoogleOAuthUserData(
                    userId: $user->id,
                    email: $googleUser->getEmail(),
                    provider: OAuthProviderEnum::GOOGLE,
                    authenticationId: $googleUser->getId(),
                    providerConfig: [],
                )
            );
        }
    }
}
