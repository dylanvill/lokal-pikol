<?php

namespace App\Http\Facility\Reservation\Resources;

use App\Http\Facility\Court\Resources\CourtResource;
use App\Http\Facility\Customer\Resources\CustomerResource;
use App\Http\Shared\Resources\PhotoResource;
use App\Http\Shared\Resources\ReservationFeeResource;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\Range;
use App\Source\Court\Actions\CourtSlotConversion\RangeToSlot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'reservationDate' => $this->reservation_date,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'status' => $this->status,
            'customer' => new CustomerResource($this->customer),
            'court' => new CourtResource($this->court),
            'fees' => new ReservationFeeResource($this->fees),
            'paymentReceipt' => new PhotoResource($this->media->first()),
            'createdAt' => $this->created_at,
            'slots' => RangeToSlot::convert(new Range(
                startTime: $this->start_time,
                endTime: $this->end_time,
            )),
        ];
    }
}
