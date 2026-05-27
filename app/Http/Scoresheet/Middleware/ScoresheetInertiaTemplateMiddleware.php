<?php

namespace App\Http\Scoresheet\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ScoresheetInertiaTemplateMiddleware
{
    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::setRootView('scoresheet');

        return $next($request);
    }
}
