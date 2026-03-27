<?php

namespace App\Http\Facility\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlockBookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'day' => $this->getDayNameAttribute()
        ];
    }
}
