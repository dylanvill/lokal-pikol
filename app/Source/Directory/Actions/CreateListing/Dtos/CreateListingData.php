<?php

namespace App\Source\Directory\Actions\CreateListing\Dtos;

readonly class CreateListingData
{
    public function __construct(
        public string $name,
        public string $city,
        public string $address,
        public array $courtTypes,
        public int $numberOfCourts,
        public ?string $email,
        public ?string $phone,
        public ?string $openingTime,
        public ?string $closingTime,
        public ?string $googleMapsUrl,
        public ?string $bookingUrl,
    ) {}
}
