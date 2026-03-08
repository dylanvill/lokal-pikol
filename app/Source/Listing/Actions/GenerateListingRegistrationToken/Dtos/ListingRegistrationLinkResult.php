<?php

namespace App\Source\Listing\Actions\GenerateListingRegistrationToken\Dtos;

use Illuminate\Support\Carbon;

readonly class ListingRegistrationLinkResult
{
    public function __construct(
        public string $uuid,
        public string $token,
        public string $expiresAt,
    ) {}
}
