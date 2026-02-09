<?php

namespace App\Http\Customer\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtInformationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "uuid" => $this->uuid,
            "name" => $this->name,
            "address" => $this->address,
            "city" => $this->city,
            "email" => $this->email,
            "phone" => $this->phone,
            "googleMapsUrl" => $this->google_maps_url,
            "profilePhoto" => $this->media ? $this->media[0]->original_url : null,
        ];
    }
}
