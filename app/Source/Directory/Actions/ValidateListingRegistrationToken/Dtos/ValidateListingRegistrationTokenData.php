<?php

namespace App\Source\Directory\Actions\ValidateListingRegistrationToken\Dtos;

class ValidateListingRegistrationTokenData
{
    public function __construct(
        public string $uuid,
        public string $token,
    ) {}
}
