<?php

namespace App\Http\Facility\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtCalendarResource extends JsonResource
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
            'courtName' => $this->name,
            'openingTime' => $this->courtPricings->first()->start_time,
            'closingTime' => $this->courtPricings->last()->end_time,
            'reservations' => CourtReservationCalendarResource::collection($this->customerReservations),
        ];
    }
}
