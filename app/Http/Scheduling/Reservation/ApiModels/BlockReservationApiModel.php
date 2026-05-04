<?php

namespace App\Http\Scheduling\Reservation\ApiModels;

use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Spatie\LaravelData\Data;

class BlockReservationApiModel extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $courtId,
        public string $courtName,
        public string $dayOfTheWeek,
        /** @var Array<CourtSlot> */
        public array $blockedSlots,
    ) {}
}
