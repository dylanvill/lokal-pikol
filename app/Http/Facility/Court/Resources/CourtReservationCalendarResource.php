<?php

namespace App\Http\Facility\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtReservationCalendarResource extends JsonResource
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
            'customerName' => $this->customer->full_name,
            'reservationDate' => $this->reservation_date,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'status' => $this->status
        ];
    }
}
