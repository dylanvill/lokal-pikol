<?php

namespace App\Source\Directory\Actions\CreateScheduleUrl;

use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Configs\InternalProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use App\Source\Directory\Models\ScheduleUrl\ScheduleUrl;

class CreateScheduleUrl
{
    public function create(Listing $listing, ScheduleProviderEnum $provider): ScheduleUrl
    {
        $config = match ($provider) {
            ScheduleProviderEnum::INTERNAL => new InternalProviderConfig(listingId: $listing->uuid),
        };

        $scheduleUrl = new ScheduleUrl;
        $scheduleUrl->listing_id = $listing->id;
        $scheduleUrl->provider = $provider;
        $scheduleUrl->config = $config;
        $scheduleUrl->save();

        return $scheduleUrl;
    }
}
