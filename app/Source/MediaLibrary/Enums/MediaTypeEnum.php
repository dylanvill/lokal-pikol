<?php

namespace App\Source\MediaLibrary\Enums;

enum MediaTypeEnum: string
{
    case FACILITY_PROFILE_PHOTO = 'facility profile photo';
    case FACILITY_COVER_PHOTO = 'facility cover photo';
    case FACILITY_PAYMENT_QR_CODE = 'facility payment qr code';
    case COURT_PHOTOS = 'court photos';
    case RESERVATION_RECEIPTS = 'reservation receipts';

    /* --------------------------------- Listing -------------------------------- */
    case LISTING_PROFILE_PHOTO = 'listing profile photo';
    case LISTING_COVER_PHOTO = 'listing cover photo';
}
