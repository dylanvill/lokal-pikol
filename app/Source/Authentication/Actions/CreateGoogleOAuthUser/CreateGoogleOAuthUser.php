<?php

namespace App\Source\Authentication\Actions\CreateGoogleOAuthUser;

use App\Source\Authentication\Actions\CreateGoogleOAuthUser\Dtos\CreateGoogleOAuthUserData;
use App\Source\Authentication\Enums\OAuthProviderEnum;
use App\Source\Authentication\Models\User;

use function Symfony\Component\Clock\now;

class CreateGoogleOAuthUser
{
    public function create(CreateGoogleOAuthUserData $data): User
    {
        $user = new User();
        $user->email = $data->email;
        $user->email_verified_at = now();
        $user->role = $data->role->value;
        $user->save();

        $user->authenticationProviders()->create([
            'email' => $data->email,
            'name' => OAuthProviderEnum::GOOGLE->value,
            'authentication_id' => $data->authenticationId, // Assuming oauthId is used as the unique identifier for Google OAuth
            'config' => empty($data->providerConfig) ? null : $data->providerConfig,
        ]);

        return $user;
    }
}
