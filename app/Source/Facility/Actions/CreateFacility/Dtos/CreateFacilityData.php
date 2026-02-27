<?php

namespace App\Source\Facility\Actions\CreateFacility\Dtos;

use App\Source\Facility\Enums\CityEnum;
use Illuminate\Http\UploadedFile;

class CreateFacilityData
{
    public function __construct(
        public int $userId,
        public string $name,
        public CityEnum $city,
        public string $address,
        public ?string $googleMapsUrl,
        public string $phone,
        public string $openingTime,
        public string $closingTime,
        public ?string $description,
        public UploadedFile $coverPhoto,
        public UploadedFile $profilePhoto,
    ) {}
}
