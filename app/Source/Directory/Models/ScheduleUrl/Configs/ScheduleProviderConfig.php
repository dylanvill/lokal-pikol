<?php

namespace App\Source\Directory\Models\ScheduleUrl\Configs;

use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use Spatie\LaravelData\Data;

abstract class ScheduleProviderConfig extends Data
{
    abstract public function provider(): ScheduleProviderEnum;

    abstract public function resolveUrl(Listing $listing): string;

    public function displayName(): string
    {
        return $this->provider()->getDisplayName();
    }
}
