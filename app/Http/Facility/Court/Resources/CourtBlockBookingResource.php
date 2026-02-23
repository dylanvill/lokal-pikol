<?php

namespace App\Http\Facility\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtBlockBookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'covered' => $this->covered,
            'blockBooking' => BlockBookingResource::collection($this->blockBookings),
        ];
    }
}
