<?php

namespace App\Source\Ad\Actions\TrackAdAnalytics\Dtos;

use App\Source\Ad\Models\Ad;
use App\Source\Analytics\Contracts\AnalyticsEntry;

class TrackAdAnalyticsData implements AnalyticsEntry
{
    public function __construct(public Ad $ad) {}

    public function getTrackableType(): ?string
    {
        return $this->ad->getMorphClass();
    }

    public function getTrackableId(): ?int
    {
        return $this->ad->id;
    }

    public function getEvent(): string
    {
        return "cta clicked";
    }

    public function getDomain(): string
    {
        return "ad";
    }

    public function getMetadata(): ?array
    {
        return null;
    }
}
