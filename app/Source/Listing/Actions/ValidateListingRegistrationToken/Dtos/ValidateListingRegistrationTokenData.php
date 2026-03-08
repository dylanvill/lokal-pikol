<?php

namespace App\Source\Listing\Actions\ValidateListingRegistrationToken\Dtos;

class ValidateListingRegistrationTokenData
{
    public function __construct(
        public string $uuid,
        public string $token,
    ) {}
}
