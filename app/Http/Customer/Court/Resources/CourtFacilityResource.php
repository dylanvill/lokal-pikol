<?php

namespace App\Http\Customer\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtFacilityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "uuid" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "photos" => [],
            "slots" => CourtSlotsResource::collection($this->slots),
        ];
    }
}
