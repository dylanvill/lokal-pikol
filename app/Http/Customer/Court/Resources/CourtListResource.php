<?php

namespace App\Http\Customer\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "uuid" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "coverPhoto" => null,
            "profilePhoto" => null,
            "openingTime" => null,
            "closingTime" => null,
            "availableSlots" => [],
        ];
    }
}
