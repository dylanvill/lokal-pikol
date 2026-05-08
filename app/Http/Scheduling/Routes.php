<?php

namespace App\Http\Scheduling;

class Routes
{
    const NAMESPACE = 'scheduling';

    const LOGIN = 'login';

    const LOGIN_POST = 'login.post';

    const PROFILE = 'profile';

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
