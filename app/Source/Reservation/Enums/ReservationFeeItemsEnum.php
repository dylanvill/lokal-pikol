<?php

namespace App\Source\Reservation\Enums;

enum ReservationFeeItemsEnum: string
{
    case HOURLY_RATE = 'hourly rate';
    case SERVICE_FEE = 'service fee';


    case HOURLY_RATE_DESCRIPTION = 'hourly rate fee';
}
