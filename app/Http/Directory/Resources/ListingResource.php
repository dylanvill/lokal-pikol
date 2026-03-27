<?php

namespace App\Http\Directory\Resources;

use App\Http\Shared\Resources\LinkResource;
use App\Source\MediaLibrary\Enums\MediaConversionEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $coverPhoto = $this->getCoverPhoto();
        $profilePhoto = $this->getProfilePhoto();

        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'city' => $this->city,
            'address' => $this->address,
            'email' => $this->email,
            'phone' => $this->phone,
            'openingTime' => $this->opening_time,
            'closingTime' => $this->closing_time,
            'googleMapsUrl' => $this->google_maps_url,
            'bookingUrl' => $this->booking_url,
            'courtType' => $this->court_type,
            'numberOfCourts' => $this->number_of_courts,
            'socialLinks' => LinkResource::collection($this->socialLinks),
            'coverPhoto' => [
                'uuid' => $coverPhoto?->uuid,
                'url' => empty($coverPhoto) ? null : $coverPhoto->getUrl(MediaConversionEnum::COVER_PHOTO_THUMBNAIL->value),
            ],
            'profilePhoto' => [
                'uuid' => $profilePhoto?->uuid,
                'url' => empty($profilePhoto) ? null : $profilePhoto->getUrl(MediaConversionEnum::PROFILE_PHOTO_THUMBNAIL->value),
            ]
        ];
    }
}
