<?php

namespace App\Source\Analytics\Actions;

use App\Source\Analytics\Contracts\AnalyticsEntry;
use App\Source\Analytics\Models\Analytics;

class AddEntry
{
    public function add(AnalyticsEntry $entry): Analytics
    {
        $analytics = new Analytics();
        $analytics->trackable_type = $entry->getTrackableType();
        $analytics->trackable_id = $entry->getTrackableId();
        $analytics->event = $entry->getEvent();
        $analytics->domain = $entry->getDomain();
        $analytics->metadata = $entry->getMetadata();
        $analytics->save();

        return $analytics;
    }
}
