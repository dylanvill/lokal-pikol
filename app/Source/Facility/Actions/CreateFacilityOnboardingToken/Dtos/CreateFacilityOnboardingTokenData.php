<?php

namespace App\Source\Facility\Actions\CreateFacilityOnboardingToken\Dtos;

readonly class CreateFacilityOnboardingTokenData
{
    public function __construct(
        public readonly string $email,
        public readonly string $name,
    ) {}
}
