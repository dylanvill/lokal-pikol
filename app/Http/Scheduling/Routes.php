<?php

namespace App\Http\Scheduling;

class Routes
{
    const NAMESPACE = 'scheduling';

    const REGISTER = 'register';

    const REGISTER_STORE = 'register.store';

    const LOGIN = 'login';

    const LOGIN_POST = 'login.post';

    const LOGOUT = 'logout';

    const PROFILE = 'profile';

    const PROFILE_EDIT = 'profile.edit';

    const PROFILE_UPDATE_PHOTOS = 'profile.update-photos';

    const PROFILE_UPDATE_DETAILS = 'profile.update-details';

    const PROFILE_UPDATE_HOURS = 'profile.update-hours';

    const PROFILE_UPDATE_SOCIAL_LINKS = 'profile.update-social-links';

    const PROFILE_DELETE_SOCIAL_LINK = 'profile.delete-social-link';

    const COURTS = 'courts';

    const CREATE_COURT = 'courts.create';

    const RESERVE_COURT = 'courts.reserve';

    const RESERVATIONS = 'reservations.show';

    const DELETE_RESERVATION = 'reservations.delete-reservation';

    const BLOCK_RESERVATION = 'reservations.block-reservation';

    const SHOW_CREATE_BLOCK_RESERVATION = 'reservations.show-create-block-reservation';

    const DELETE_BLOCK_RESERVATION = 'reservations.delete-block-reservation';

    const CREATE_BLOCK_RESERVATION = 'reservations.create-block-reservation';

    const AVAILABILITY = 'availability';

    const BOOKINGS = 'bookings';

    const BOOKINGS_CREATE = 'bookings.create';

    const CALENDAR = 'calendar';

    public static function getFullName(string $route): string
    {
        return self::NAMESPACE.".{$route}";
    }
}
