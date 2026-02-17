<?php

namespace App\Http\Enums;

enum GuardEnum: string
{
    case CUSTOMER = 'customer';
    case FACILITY = 'facility';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
