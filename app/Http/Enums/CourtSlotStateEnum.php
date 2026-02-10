<?php

namespace App\Http\Enums;

enum CourtSlotStateEnum: string
{
    case Available = 'available';
    case Reserved = 'reserved';
}
