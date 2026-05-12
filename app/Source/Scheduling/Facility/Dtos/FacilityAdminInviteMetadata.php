<?php

namespace App\Source\Scheduling\Facility\Dtos;

readonly class FacilityAdminInviteMetadata
{
    public function __construct(
        public int $listingId,
        public string $email,
    ) {}

    /**
     * @param  array{listing_id: int, email: string}  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            listingId: $data['listing_id'],
            email: $data['email'],
        );
    }

    /**
     * @return array{listing_id: int, email: string}
     */
    public function toArray(): array
    {
        return [
            'listing_id' => $this->listingId,
            'email' => $this->email,
        ];
    }
}
