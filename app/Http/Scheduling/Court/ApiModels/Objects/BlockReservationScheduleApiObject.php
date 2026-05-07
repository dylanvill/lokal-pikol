<?php

namespace App\Http\Scheduling\Court\ApiModels\Objects;

use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Spatie\LaravelData\Data;

class BlockReservationScheduleApiObject extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        /** @var CourtSlot $slots */
        public array $slots,
    ) {}
}
