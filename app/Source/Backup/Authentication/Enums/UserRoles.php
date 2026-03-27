<?php

namespace App\Source\Authentication\Enums;

enum UserRoles: string
{
    case CUSTOMER = 'customer';
    case FACILITY = 'facility';
}
