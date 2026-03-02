<?php

namespace App\Source\Authentication\Actions\CreateGoogleOAuthUser\Dtos;

use App\Source\Authentication\Enums\OAuthProviderEnum;
use App\Source\Authentication\Enums\UserRoles;

readonly class CreateGoogleOAuthUserData
{
    public function __construct(
        public string $email,
        public OAuthProviderEnum $provider,
        public string $authenticationId,
        public UserRoles $role,
        public array $providerConfig = [],
    ) {}
}
