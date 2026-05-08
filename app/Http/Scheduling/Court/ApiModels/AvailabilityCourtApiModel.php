<?php

namespace App\Http\Scheduling\Court\ApiModels;

use App\Source\Scheduling\Court\Models\Court;
use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Spatie\LaravelData\Data;

class AvailabilityCourtApiModel extends Data
{
    private function __construct(
        public string $id,
        public string $name,
        /** @var array<CourtSlot> */
        public array $slots,
    ) {}

    /**
     * @param  array<CourtSlot>  $slots
     */
    public static function fromCourtAndSlots(Court $court, array $slots): self
    {
        return new self(
            id: $court->uuid,
            name: $court->name,
            slots: $slots,
        );
    }
}
