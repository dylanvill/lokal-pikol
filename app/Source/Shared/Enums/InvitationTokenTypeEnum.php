<?php

namespace App\Source\Shared\Enums;

enum InvitationTokenTypeEnum: string
{
    case LISTING_REGISTRATION = 'listing registration';
    case FACILITY_ADMIN_INVITE = 'facility admin invite';
}
