<?php

namespace App\Source\Reservation\Enums;

enum ReservationStatusEnum: string
{
    case ON_HOLD = 'on hold';
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case CANCELLED = 'cancelled';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
