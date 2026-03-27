<?php

namespace App\Source\Court\Actions\GetCourtCalendar\Dtos;

use App\Source\Court\Actions\GetCourtCalendar\Contracts\CalendarItemMetadata;
use Illuminate\Contracts\Support\Arrayable;

readonly class CourtCalendarItem implements Arrayable
{
    public function __construct(
        public string $id,
        public string $uuid,
        public string $model,
        public string $label,
        public string $reservationDate,
        public string $startTime,
        public string $endTime,
        public CalendarItemMetadata $metadata
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,  
            'uuid' => $this->uuid,
            'model' => $this->model,
            'label' => $this->label,
            'reservationDate' => $this->reservationDate,
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'metadata' => $this->metadata->toArray(),
        ];
    }
}
