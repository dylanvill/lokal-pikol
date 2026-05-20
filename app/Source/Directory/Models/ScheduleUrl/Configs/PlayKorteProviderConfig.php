<?php

namespace App\Source\Directory\Models\ScheduleUrl\Configs;

use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;

class PlayKorteProviderConfig extends ScheduleProviderConfig
{
    public function __construct(
        public readonly string $url,
    ) {}

    public function provider(): ScheduleProviderEnum
    {
        return ScheduleProviderEnum::PLAYKORTE;
    }

    public function resolveUrl(Listing $listing): string
    {
        return $this->url;
    }
}
