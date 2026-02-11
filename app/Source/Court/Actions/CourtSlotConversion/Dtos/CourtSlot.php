<?php

namespace App\Source\Court\Actions\CourtSlotConversion\Dtos;

use Illuminate\Contracts\Support\Arrayable;

readonly class CourtSlot implements Arrayable
{
    public function __construct(
        public string $startTime,
        public string $endTime,
        public float $price,
    ) {}

    public function toArray()
    {
        return [
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'price' => $this->price,
        ];
    }
}
