<?php

namespace App\Source\Authentication\Actions\CreateGoogleOAuthUser\Dtos;

use App\Source\Authentication\Enums\OAuthProviderEnum;
use App\Source\Authentication\Enums\UserRoles;

readonly class CreateGoogleOAuthUserData
{
    public function __construct(
        public int $userId,
        public string $email,
        public OAuthProviderEnum $provider,
        public string $authenticationId,
        public array $providerConfig = [],
    ) {}
}
