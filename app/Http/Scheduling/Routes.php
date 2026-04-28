<?php

namespace App\Http\Scheduling;

class Routes
{
    const NAMESPACE = 'scheduling';

    const LOGIN = 'login';
    const LOGIN_POST = 'login.post';

    const DASHBOARD = 'dashboard';

    public static function getFullName(string $route): string
    {
        return self::NAMESPACE . ".{$route}";
    }
}
