<?php

namespace App\Http\Customer\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtSlotResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "startTime" => $this["startTime"],
            "endTime" => $this["endTime"],
            "price" => $this["price"],
            "isAvailable" => $this["isAvailable"],
        ];
    }
}
