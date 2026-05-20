<?php

namespace App\Source\Directory\Models\ScheduleUrl\Configs;

use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;

class LokalPikolProviderConfig extends ScheduleProviderConfig
{
    public function __construct(
        public readonly string $listingId,
    ) {}

    public function provider(): ScheduleProviderEnum
    {
        return ScheduleProviderEnum::LOKAL_PIKOL;
    }

    public function resolveUrl(Listing $listing): string
    {
        return route('directory.schedule.show', ['listing' => $listing->slug]);
    }
}
