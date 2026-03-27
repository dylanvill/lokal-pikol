<?php

namespace App\Source\Court\Actions\CreateCourtPricing\Dtos;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Carbon;

readonly class CreateCourtPricingData implements Arrayable
{
    public function __construct(
        public string $startTime,
        public string $endTime,
        public float $price,
    ) {}

    public function toArray(): array
    {
        return [
            'start_time' => $this->startTime,
            'end_time' => $this->endTime,
            'price' => $this->price,
        ];
    }
}