<?php

namespace App\Http\Scoresheet;

class Routes
{
    const NAMESPACE = 'scoresheet';

    const HOME = 'home';

    public static function getFullName(string $route): string
    {
        return self::NAMESPACE.".{$route}";
    }
}
