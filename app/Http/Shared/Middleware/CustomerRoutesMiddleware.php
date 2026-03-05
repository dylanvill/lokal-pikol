<?php

namespace App\Http\Shared\Middleware;

use App\Http\Enums\GuardEnum;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware to ensure that facilities won't be able to
 * access customer routes while authenticated.
 */
class CustomerRoutesMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isFacility = Auth::guard(GuardEnum::FACILITY->value)->check();

        if ($isFacility) return redirect()->route('facility.dashboard');

        return $next($request);
    }
}
