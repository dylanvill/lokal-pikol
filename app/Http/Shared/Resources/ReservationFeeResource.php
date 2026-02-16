<?php

namespace App\Http\Shared\Resources;

use App\Source\Court\Actions\CourtSlotConversion\Dtos\CourtSlot;
use App\Source\Reservation\Enums\ReservationFeeItemsEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use App\Source\Reservation\Models\ReservationFee;

class ReservationFeeResource extends JsonResource
{
    /**
     * @param Collection<ReservationFee> $reservationFees
     */
    public function __construct(Collection $fees)
    {
        parent::__construct($fees);
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'serviceFee' => $this->parseServiceFee($this->resource),
            'hourlyFees' => $this->parseHourlyFees($this->resource),
        ];
    }

    public function parseServiceFee(Collection $fees): float
    {
        return $fees->where("item", ReservationFeeItemsEnum::SERVICE_FEE->value)->pluck('amount')->reduce(function (float $carry, float $amount) {
            return $amount + $carry;
        }, 0);
    }

    public function parseHourlyFees(Collection $fees): array
    {
        return $fees->where("description", ReservationFeeItemsEnum::HOURLY_RATE_DESCRIPTION->value)->map(function ($fee, $key) {
            return new CourtSlot(
                startTime: explode('-', $fee->item)[0],
                endTime: explode('-', $fee->item)[1],
                price: $fee->amount
            );
        })->toArray();
    }
}
