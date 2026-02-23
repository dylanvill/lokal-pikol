<?php

namespace App\Source\Court\Actions\GetCourtBlockBookingSchedules\Dtos;

use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;

class BlockBookingSlot extends CourtSlot
{
    public function __construct(
        public string $name,
        public string $startTime,
        public string $endTime,
        public float|null $price = null,
        public bool|null $isAvailable = null,
    ) {
        parent::__construct(startTime: $startTime, endTime: $endTime, price: $price, isAvailable: $isAvailable);
    }

    public function toArray()
    {
        return [
            'name' => $this->name,
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'price' => $this->price,
            'isAvailable' => $this->isAvailable,
        ];
    }
}
