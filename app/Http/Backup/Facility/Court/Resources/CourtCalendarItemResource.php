<?php

namespace App\Http\Facility\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class CourtCalendarItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'type' => Str::lower($this->model),
            'label' => $this->label,
            'reservationDate' => $this->reservationDate,
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'metadata' => $this->metadata->toArray(),
        ];
    }
}
