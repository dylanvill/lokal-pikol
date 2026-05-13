<?php

namespace App\Source\Scheduling\Court\Actions\UpdateCourt\Dtos;

use App\Source\Scheduling\Court\Models\Court;

readonly class UpdateCourtData
{
    public function __construct(
        public Court $court,
        public string $name,
    ) {}
}
