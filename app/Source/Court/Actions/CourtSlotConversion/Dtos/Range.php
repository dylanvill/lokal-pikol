<?php

namespace App\Source\Court\Actions\CourtSlotConversion\Dtos;

readonly class Range
{
    public function __construct(
        public string $startTime,
        public string $endTime,
    ) {}
}
