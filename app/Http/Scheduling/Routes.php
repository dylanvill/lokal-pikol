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

    const BOOKINGS = 'bookings';
    const BOOKINGS_CREATE = 'bookings.create';

    const CALENDAR = 'calendar';

    public static function getFullName(string $route): string
    {
        return self::NAMESPACE . ".{$route}";
    }
}
