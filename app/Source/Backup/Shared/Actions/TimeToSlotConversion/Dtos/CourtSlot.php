<?php

namespace App\Source\Shared\Actions\TimeToSlotConversion\Dtos;

use Illuminate\Contracts\Support\Arrayable;

class CourtSlot implements Arrayable
{
    public function __construct(
        public string $startTime,
        public string $endTime,
        public float|null $price = null,
        public bool|null $isAvailable = null
    ) {}

    public function toArray()
    {
        return [
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'price' => $this->price,
            'isAvailable' => $this->isAvailable
        ];
    }
}
