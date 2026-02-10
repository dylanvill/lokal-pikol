<?php

namespace App\Http\Customer\Facility\Resources;

use App\Http\Shared\Resources\PhotoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "coverPhoto" => PhotoResource::make($this->getFirstMedia('facility cover photo')),
            "profilePhoto" => PhotoResource::make($this->getFirstMedia('facility profile photo')),
            "openingTime" => "07:00:00 AM",
            "closingTime" => "10:00:00 PM",
            "availableSlots" => [],
        ];
    }
}
