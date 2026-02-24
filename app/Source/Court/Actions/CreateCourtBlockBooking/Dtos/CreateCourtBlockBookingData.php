<?php

namespace App\Source\Court\Actions\CreateCourtBlockBooking\Dtos;

use App\Source\Court\Enums\BlockBookingDaysEnum;

readonly class CreateCourtBlockBookingData
{
    public function __construct(
        public int $courtId,
        public string $name,
        public BlockBookingDaysEnum $day,
        public string $startTime,
        public string $endTime,
    ) {}
}
