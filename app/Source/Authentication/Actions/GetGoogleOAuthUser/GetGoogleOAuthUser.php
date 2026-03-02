<?php

namespace App\Source\Authentication\Actions\GetGoogleOAuthUser;

use App\Source\Authentication\Enums\OAuthProviderEnum;
use App\Source\Authentication\Models\AuthenticationProvider;
use App\Source\Authentication\Models\User;

class GetGoogleOAuthUser
{
    public function get(string $oauthId): User|null
    {
        $authenticationProvider = AuthenticationProvider::where('name', OAuthProviderEnum::GOOGLE->value)
            ->where('authentication_id', $oauthId)
            ->first();

        if (empty($authenticationProvider)) return null;

        return $authenticationProvider->user;
    }
}
