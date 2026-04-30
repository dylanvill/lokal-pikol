<?php

namespace App\Http\Scheduling\Reservation\Resources;

use App\Http\Scheduling\Court\Resources\CourtSlotResource;
use App\Source\Scheduling\Court\Shared\Helpers\RangeToCourtSlot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlockReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $slots = (new RangeToCourtSlot())->convert($this->start_time, $this->end_time);

        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'courtId' => $this->court->uuid,
            'courtName' => $this->court->name,
            'dayOfTheWeek' => $this->day_of_the_week,
            'blockedSlots' => CourtSlotResource::collection($slots)
        ];
    }
}
