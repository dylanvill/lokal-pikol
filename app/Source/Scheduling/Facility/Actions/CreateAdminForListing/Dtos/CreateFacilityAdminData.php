<?php

namespace App\Source\Scheduling\Facility\Actions\CreateAdminForListing\Dtos;

use App\Source\Directory\Models\Listing;

class CreateFacilityAdminData
{
    public function __construct(
        public readonly Listing $listing,
        public readonly string $email,
        public readonly ?string $password = null,
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $phoneNumber
    ) {}
}
