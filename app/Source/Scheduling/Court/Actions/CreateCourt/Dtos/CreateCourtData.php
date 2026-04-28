<?php

namespace App\Source\Scheduling\Court\Actions\CreateCourt\Dtos;

use App\Source\Directory\Models\Listing;

readonly class CreateCourtData
{
    public function __construct(
        public Listing $listing,
        public string $name,
    ) {}
}
