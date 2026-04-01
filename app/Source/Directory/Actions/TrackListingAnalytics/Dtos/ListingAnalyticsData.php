<?php

namespace App\Source\Directory\Actions\TrackListingAnalytics\Dtos;

use App\Source\Analytics\Contracts\AnalyticsEntry;
use App\Source\Directory\Models\Listing;

class ListingAnalyticsData implements AnalyticsEntry
{
    public function __construct(
        protected Listing $listing,
        protected string $event,
    ) {}

    public function getTrackableType(): ?string
    {
        return $this->listing->getMorphClass();
    }

    public function getTrackableId(): ?int
    {
        return $this->listing->getKey();
    }

    public function getEvent(): string
    {
        return $this->event;
    }

    public function getDomain(): string
    {
        return "directory";
    }

    public function getMetadata(): ?array
    {
        return null;
    }
}
