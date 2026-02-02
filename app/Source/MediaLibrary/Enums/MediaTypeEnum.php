<?php

namespace App\Source\MediaLibrary\Enums;

enum MediaTypeEnum: string
{
    case CLIENT_PROFILE_IMAGE = 'client profile image';
    case CLIENT_COVER_PHOTO = 'client cover photo';
    case COURT_PHOTOS = 'court photos';
}
