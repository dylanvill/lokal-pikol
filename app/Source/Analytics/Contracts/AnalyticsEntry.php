<?php

namespace App\Source\Analytics\Contracts;

interface AnalyticsEntry
{
    public function getTrackableType(): ?string;

    public function getTrackableId(): ?int;

    public function getEvent(): string;

    public function getDomain(): string;

    public function getMetadata(): ?array;
}
