<?php

namespace App\Source\Court\Actions\CreateCourtSlot\Dtos;

use Illuminate\Contracts\Support\Arrayable;

readonly class CreateCourtSlotData implements Arrayable
{
    public function __construct(
        public string $time,
        public int $courtId,
    ) {}

    public function toArray(): array
    {
        return [
            'time' => $this->time,
            'court_id' => $this->courtId,
        ];
    }
}