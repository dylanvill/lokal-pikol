<?php

namespace App\Source\Authentication\Actions\CreateGoogleOAuthUser;

use App\Source\Authentication\Actions\CreateGoogleOAuthUser\Dtos\CreateGoogleOAuthUserData;
use App\Source\Authentication\Enums\OAuthProviderEnum;
use App\Source\Authentication\Models\AuthenticationProvider;
use App\Source\Authentication\Models\User;

use function Symfony\Component\Clock\now;

class CreateGoogleOAuthUser
{
    public function create(CreateGoogleOAuthUserData $data): AuthenticationProvider
    {

        $auth = new AuthenticationProvider();
        $auth->user_id = $data->userId;
        $auth->email = $data->email;
        $auth->name = $data->provider->value;
        $auth->authentication_id = $data->authenticationId;
        $auth->config = empty($data->providerConfig) ? null : $data->providerConfig;
        
        $auth->save();

        return $auth;
    }
}
