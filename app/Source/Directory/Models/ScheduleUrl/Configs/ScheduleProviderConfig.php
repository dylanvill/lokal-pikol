<?php

namespace App\Source\Directory\Models\ScheduleUrl\Configs;

use App\Source\Directory\Models\Listing;
use Spatie\LaravelData\Data;

abstract class ScheduleProviderConfig extends Data
{
    abstract public function displayName(): string;

    abstract public function resolveUrl(Listing $listing): string;
}
