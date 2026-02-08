<?php

namespace App\Source\Court\Actions\CreateCourt\Dtos;

use Illuminate\Contracts\Support\Arrayable;

readonly class CourtSlotData  implements Arrayable
{
    public function __construct(
        public string $time,
        public float $rate
    ) {}

    public function toArray(): array
    {
        return [
            'time' => $this->time,
            'rate' => $this->rate
        ];
    }
}
