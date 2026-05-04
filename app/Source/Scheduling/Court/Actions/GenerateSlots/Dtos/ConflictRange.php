<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots\Dtos;

use Carbon\Carbon;

final readonly class ConflictRange
{
    public function __construct(
        public Carbon $start,
        public Carbon $end,
        public string $label,
    ) {}
}
