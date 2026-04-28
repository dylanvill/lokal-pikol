<?php

namespace App\Http\Scheduling\Middleware;

use App\Http\Scheduling\Routes;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;

class SchedulingAuthenticate extends Authenticate
{
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route(Routes::getFullName(Routes::LOGIN));
    }
}
