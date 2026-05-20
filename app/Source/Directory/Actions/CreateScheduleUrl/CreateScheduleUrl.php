<?php

namespace App\Source\Directory\Actions\CreateScheduleUrl;

use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Configs\ScheduleProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\ScheduleUrl;

class CreateScheduleUrl
{
    public function create(Listing $listing, ScheduleProviderConfig $config): ScheduleUrl
    {
        $scheduleUrl = new ScheduleUrl;
        $scheduleUrl->listing_id = $listing->id;
        $scheduleUrl->provider = $config->provider();
        $scheduleUrl->config = $config;
        $scheduleUrl->save();

        return $scheduleUrl;
    }
}
