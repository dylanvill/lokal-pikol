<?php

namespace App\Http\Customer\Facility\Resources;

use App\Http\Shared\Resources\PhotoResource;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $coverPhoto = $this->media->firstWhere('collection_name', MediaTypeEnum::FACILITY_COVER_PHOTO->value);
        $profilePhoto = $this->media->firstWhere('collection_name', MediaTypeEnum::FACILITY_PROFILE_PHOTO->value);

        return [
            "id" => $this->uuid,
            "name" => $this->name,
            "description" => $this->description,
            "address" => $this->address,
            "city" => $this->city,
            "email" => $this->email,
            "phone" => $this->phone,
            "googleMapsUrl" => $this->google_maps_url,
            "profilePhoto" => $profilePhoto ? new PhotoResource($profilePhoto) : null,
            "coverPhoto" => $coverPhoto ? new PhotoResource($coverPhoto) : null,
            "openingTime" => $this->opening_time,
            "closingTime" => $this->closing_time,
        ];
    }
}
