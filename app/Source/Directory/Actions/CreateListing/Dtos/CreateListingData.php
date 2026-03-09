<?php

namespace App\Source\Directory\Actions\CreateListing\Dtos;

use Illuminate\Http\UploadedFile;

readonly class CreateListingData
{
    public function __construct(
        public string $name,
        public string $city,
        public string $address,
        public string $courtType,
        public int $numberOfCourts,
        public UploadedFile $profilePhoto,
        public UploadedFile $coverPhoto,
        public ?string $email,
        public ?string $phone,
        public ?string $openingTime,
        public ?string $closingTime,
        public ?string $googleMapsUrl,
        public ?string $bookingUrl,
    ) {}
}
