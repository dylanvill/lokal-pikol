<?php

namespace App\Http\Customer\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtTimeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->uuid,
            "startTime" => $this->startTime,
            "endTime" => $this->endTime,
            "price" => $this->price,
        ];
    }
}
