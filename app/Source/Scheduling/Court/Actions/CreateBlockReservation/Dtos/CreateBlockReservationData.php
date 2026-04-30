<?php

namespace App\Source\Scheduling\Court\Actions\CreateBlockReservation\Dtos;

use App\Source\Scheduling\Court\Models\Court;

readonly class CreateBlockReservationData
{
    public function __construct(
        public Court $court,
        public string $name,
        public string $dayOfTheWeek,
        public string $startTime,
        public string $endTime,
    ) {}
}
