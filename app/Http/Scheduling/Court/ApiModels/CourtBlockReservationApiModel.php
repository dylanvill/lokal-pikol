<?php

namespace App\Http\Scheduling\Court\ApiModels;

use App\Source\Scheduling\Court\Models\Court;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class CourtBlockReservationApiModel extends Data
{
    private function __construct(
        public string $id,
        public string $name,
        /** @var array<BlockReservationApiModel> */
        public array $blockReservations,
        public string $createdAt
    ) {}

    public static function fromCourt(Court $court): self
    {
        return new self(
            id: $court->uuid,
            name: $court->name,
            blockReservations: BlockReservationApiModel::fromManyBlockReservations($court->blockReservations),
            createdAt: $court->created_at,
        );
    }

    public static function fromManyCourts(Collection $courts): array
    {
        return $courts->map(fn ($court) => self::fromCourt($court))->toArray();
    }
}
