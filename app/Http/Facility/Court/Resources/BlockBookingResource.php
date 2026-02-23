<?php

namespace App\Http\Facility\Court\Resources;

use App\Http\Facility\Court\Resources\CourtResource;
use App\Http\Facility\Customer\Resources\CustomerResource;
use App\Http\Shared\Resources\PhotoResource;
use App\Http\Shared\Resources\ReservationFeeResource;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\RangeToSlot;
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
