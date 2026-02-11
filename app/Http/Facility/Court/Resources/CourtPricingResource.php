<?php

namespace App\Http\Facility\Court\Resources;

use App\Http\Shared\Resources\PhotoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtPricingResource extends JsonResource
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
            "startTime" => $this->start_time,
            "endTime" => $this->end_time,
            "rate" => $this->price,
        ];
    }
}
