<?php

namespace App\Source\Scheduling\Court\Shared\Dtos;

use Illuminate\Contracts\Support\Arrayable;

class CourtSlot implements Arrayable
{
    public function __construct(
        public string $slot,
        public string $display,
        public bool $isAvailable
    ) {}

    public function toArray()
    {
        return [
            "slot" => $this->slot,
            "display" => $this->display,
            "isAvailable" => $this->isAvailable
        ];
    }
}
