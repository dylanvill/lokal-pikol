<?php

namespace App\Http\Customer\Court\Resources;

use App\Http\Shared\Resources\PhotoResource;
use App\Source\Court\Actions\CourtSlotConversion\RangeToSlot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "photos" => PhotoResource::collection($this->media),
            "slots" => RangeToSlot::covertMany($this->courtPricings),
        ];
    }
}
