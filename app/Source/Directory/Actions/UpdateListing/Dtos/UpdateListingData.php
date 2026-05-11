<?php

namespace App\Source\Directory\Actions\UpdateListing\Dtos;

readonly class UpdateListingData
{
    public function __construct(
        public ?string $name = null,
        public ?string $courtType = null,
        public ?int $numberOfCourts = null,
        public ?string $email = null,
        public ?string $phone = null,
        public ?string $openingTime = null,
        public ?string $closingTime = null,
        public ?string $googleMapsUrl = null,
        public ?string $bookingUrl = null,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toListingAttributes(): array
    {
        return array_filter([
            'name' => $this->name,
            'court_type' => $this->courtType,
            'number_of_courts' => $this->numberOfCourts,
            'email' => $this->email,
            'phone' => $this->phone,
            'opening_time' => $this->openingTime,
            'closing_time' => $this->closingTime,
            'google_maps_url' => $this->googleMapsUrl,
            'booking_url' => $this->bookingUrl,
        ], fn ($value) => $value !== null);
    }
}
