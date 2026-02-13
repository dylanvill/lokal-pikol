<?php

namespace App\Source\Reservation\Enums;

enum ReservationStatusEnum: string
{
    case ON_HOLD = 'on_hold';
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case CANCELLED = 'cancelled';
}
