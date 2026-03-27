<?php

namespace App\Http\Facility\Reservation\Resources;

use App\Http\Shared\Resources\PhotoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationListResource extends JsonResource
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
            'courtName' => $this->court->name,
            'customerName' => $this->reservable->reservationNameDisplay(),
            'customerPhone' => $this->reservable->reservationPhone(),
            'customerEmail' => $this->reservable->reservationEmail(),
            'reservationDate' => $this->reservation_date,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'status' => $this->status,
            'paymentReceipt' => new PhotoResource($this->media->first()),
            'createdAt' => $this->created_at,
        ];
    }
}
