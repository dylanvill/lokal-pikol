<?php

namespace App\Source\Directory\Models\ScheduleUrl\Configs;

use App\Source\Directory\Models\Listing;

class InternalProviderConfig extends ScheduleProviderConfig
{
    public function __construct(
        public readonly string $listingId,
    ) {}

    public function displayName(): string
    {
        return 'Lokal Pikol';
    }

    public function resolveUrl(Listing $listing): string
    {
        return route('directory.schedule.show', ['listing' => $listing->slug]);
    }
}
