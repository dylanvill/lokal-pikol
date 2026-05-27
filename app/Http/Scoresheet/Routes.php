<?php

namespace App\Http\Scoresheet;

class Routes
{
    const NAMESPACE = 'scoresheet';

    const HOME = 'home';

    const SESSION_SHOW = 'session.show';

    const SESSION_MATCHES_STORE = 'session.matches.store';

    public static function getFullName(string $route): string
    {
        return self::NAMESPACE.".{$route}";
    }
}
