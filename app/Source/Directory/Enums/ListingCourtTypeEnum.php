<?php

namespace App\Source\Directory\Enums;

enum ListingCourtTypeEnum: string
{
    case COVERED = 'Covered';
    case OUTDOOR = 'Outdoor';
    case COVERED_AND_OUTDOOR = 'Covered and Outdoor';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
