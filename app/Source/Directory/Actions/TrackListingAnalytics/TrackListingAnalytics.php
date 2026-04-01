<?php

namespace App\Source\Directory\Actions\TrackListingAnalytics;

use App\Source\Directory\Actions\TrackListingAnalytics\Dtos\ListingAnalyticsData;
use App\Source\Directory\Enums\ListingEventEnum;
use App\Source\Directory\Events\ListingClicked;
use App\Source\Directory\Models\Listing;

class TrackListingAnalytics
{
    public function track(Listing $listing, ListingEventEnum $event): void
    {
        ListingClicked::dispatch(new ListingAnalyticsData($listing, $event->value));
    }
}
