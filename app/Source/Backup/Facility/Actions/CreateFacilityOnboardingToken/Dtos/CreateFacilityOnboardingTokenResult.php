<?php

namespace App\Source\Facility\Actions\CreateFacilityOnboardingToken\Dtos;

class CreateFacilityOnboardingTokenResult
{
    public function __construct(
        public readonly int $id,
        public readonly string $uuid,
        public readonly string $name,
        public readonly string $email,
        public readonly string $plainToken,
        public readonly string $expiresAt,
    ) {}
}
