<?php

namespace App\Source\MediaLibrary\Enums;

enum MediaTypeEnum: string
{
    case FACILITY_PROFILE_PHOTO = 'facility profile photo';
    case FACILITY_COVER_PHOTO = 'facility cover photo';
    case COURT_PHOTOS = 'court photos';
    case RESERVATION_RECEIPTS = 'reservation receipts';
}
