<?php

namespace App\Http\Facility\Court\Resources;

use App\Http\Shared\Resources\PhotoResource;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\Range;
use App\Source\Court\Actions\CourtSlotConversion\RangeToSlot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "photos" => PhotoResource::collection($this->media),
            "courtPricings" => CourtPricingResource::collection($this->courtPricings),
            "slots" => RangeToSlot::convertMany($this->courtPricings->map(function ($pricing) {
                return new Range(
                    startTime: $pricing->start_time,
                    endTime: $pricing->end_time,
                    price: $pricing->price
                );
            })->all()),
        ];
    }
}
