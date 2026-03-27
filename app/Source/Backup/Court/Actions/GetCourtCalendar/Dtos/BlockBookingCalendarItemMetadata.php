<?php

namespace App\Source\Court\Actions\GetCourtCalendar\Dtos;

use App\Source\Court\Actions\GetCourtCalendar\Contracts\CalendarItemMetadata;
use App\Source\Court\Enums\BlockBookingDaysEnum;

readonly class BlockBookingCalendarItemMetadata implements CalendarItemMetadata
{
    public function __construct(
        public BlockBookingDaysEnum $dayOfTheWeek
    ) {}

    public function toArray(): array
    {
        return [
            'dayOfTheWeek' => $this->dayOfTheWeek->value,
        ];
    }
}
