<?php

namespace App\Source\Ad\Enums;

enum CtaLabelEnum: string
{
    case LEARN_MORE = 'Learn More';
    case ORDER_NOW = 'Order Now';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
