<?php

namespace App\Http\Facility\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class CourtCalendarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        Log::info('CourtCalendarResource', [
            'court_id' => $this->id,
            'court_pricings_count' => $this->courtPricings->count(),
            'court_pricings_loaded' => $this->relationLoaded('courtPricings'),
            'court_pricings_exists' => !is_null($this->courtPricings),
        ]);

        return [
            'id' => $this->uuid,
            'courtName' => $this->name,
            'openingTime' => $this->courtPricings->first()->start_time,
            'closingTime' => $this->courtPricings->last()->end_time,
            'reservations' => CourtReservationCalendarResource::collection($this->reservations),
        ];
    }
}
