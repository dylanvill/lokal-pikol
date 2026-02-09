<?php

namespace App\Http\Customer\Court\Resources;

use App\Http\Shared\Resources\PhotoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "uuid" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "photos" => PhotoResource::collection($this->media),
            "slots" => CourtSlotResource::collection($this->courtSlots),
        ];
    }
}
