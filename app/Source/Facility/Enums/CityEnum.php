<?php

namespace App\Source\Facility\Enums;

enum CityEnum: string
{
    case DUMAGUETE = 'Dumaguete';
    case VALENCIA = 'Valencia';
    case BACONG = 'Bacong';
    case SIBULAN = 'Sibulan';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
