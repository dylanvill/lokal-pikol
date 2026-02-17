<?php

namespace App\Http\Customer\Facility\Resources;

use App\Http\Shared\Resources\PhotoResource;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacilityListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->uuid,
            "name" => $this->name,
            "courtType" => $this->parseCourtType(),
            "coverPhoto" => $this->parseCoverPhoto(),
            "profilePhoto" => $this->parseProfilePhoto(),
            "openingTime" => $this->opening_time,
            "closingTime" => $this->closing_time,
            "availableSlots" => [],
            "city" => $this->city,
            "address" => $this->address,
            "numberOfCourts" => $this->courts->count(),
        ];
    }

    public function parseCourtType(): string
    {
        $typeDisplay = "";

        /** @var \Illuminate\Support\Collection */
        $types = $this->courts
            ->pluck('covered')
            ->unique()
            ->values();
        if ($types->contains(true) && $types->contains(false)) {
            $typeDisplay = "Covered & Outdoor";
        } elseif ($types->first() === true) {
            $typeDisplay = "Covered";
        } elseif ($types->contains(false)) {
            $typeDisplay = "Outdoor";
        }

        return $typeDisplay;
    }

    public function parseCoverPhoto(): PhotoResource|null
    {
        if (empty($this->media)) return null;

        $media = $this->media->where('collection_name', MediaTypeEnum::FACILITY_COVER_PHOTO)->first();
        return $media ? new PhotoResource($media) : null;
    }

    public function parseProfilePhoto(): PhotoResource|null
    {
        if (empty($this->media)) return null;

        $media = $this->media->where('collection_name', MediaTypeEnum::FACILITY_PROFILE_PHOTO)->first();
        return $media ? new PhotoResource($media) : null;
    }
}
