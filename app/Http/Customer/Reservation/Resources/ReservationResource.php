<?php

namespace App\Http\Customer\Reservation\Resources;

use App\Http\Customer\Court\Resources\CourtResource;
use App\Http\Customer\Facility\Resources\FacilityResource;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\Range;
use App\Source\Court\Actions\CourtSlotConversion\RangeToSlot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'facility' => new FacilityResource($this->court->facility),
            'court' => new CourtResource($this->court),
            'slots' => RangeToSlot::convert(new Range(
                startTime: $this->start_time,
                endTime: $this->end_time,
            )),
            'reservationDate' => $this->reservation_date,
            'status' => $this->status,
            'fees' => new ReservationFeeResource($this->fees),
        ];
    }
}
