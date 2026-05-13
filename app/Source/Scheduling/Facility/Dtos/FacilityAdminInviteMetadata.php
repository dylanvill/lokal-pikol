<?php

namespace App\Source\Scheduling\Facility\Dtos;

readonly class FacilityAdminInviteMetadata
{
    public function __construct(
        public int $listingId,
        public string $email,
        public int $courtCount,
    ) {}

    /**
     * @param  array{listing_id: int, email: string, court_count: int}  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            listingId: $data['listing_id'],
            email: $data['email'],
            courtCount: $data['court_count'],
        );
    }

    /**
     * @return array{listing_id: int, email: string, court_count: int}
     */
    public function toArray(): array
    {
        return [
            'listing_id' => $this->listingId,
            'email' => $this->email,
            'court_count' => $this->courtCount,
        ];
    }
}
