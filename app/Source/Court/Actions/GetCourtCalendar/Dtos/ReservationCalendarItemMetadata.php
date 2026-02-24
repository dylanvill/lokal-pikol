<?php

namespace App\Source\Court\Actions\GetCourtCalendar\Dtos;

use App\Source\Court\Actions\GetCourtCalendar\Contracts\CalendarItemMetadata;
use App\Source\Reservation\Enums\ReservationStatusEnum;

readonly class ReservationCalendarItemMetadata implements CalendarItemMetadata
{
    public function __construct(
        public ReservationStatusEnum $status
    ) {}

    public function toArray(): array
    {
        return [
            'status' => $this->status->value,
        ];
    }
}
