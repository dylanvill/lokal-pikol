<?php

namespace App\Http\Client\Court\Resources;

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
            "uuid" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "photos" => CourtPhotosResource::collection($this->media),
            "slots" => CourtSlotResource::collection($this->courtSlots),
        ];
    }
}
