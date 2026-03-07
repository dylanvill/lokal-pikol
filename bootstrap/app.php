<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Source\Facility\Commands\SendOnboardingInvite;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            $tld = config('app.tld');

            Route::domain($tld)
                ->middleware('web')
                ->group(base_path('routes/web.php'));

            Route::domain($tld)
                ->middleware('web')
                ->prefix('facility')
                ->name('facility.')
                ->group(base_path('routes/facility.php'));

            Route::domain("find.{$tld}")
                ->middleware('web')
                ->name('find.')
                ->group(base_path('routes/find.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);


        $middleware->preventRequestsDuringMaintenance(except: [
            'privacy-policy',
            'terms-and-conditions',
        ]);
    })
    ->withCommands([
        SendOnboardingInvite::class
    ])->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (!App::environment(['local']) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                return Inertia::render('ErrorPage', ['status' => $response->getStatusCode()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            }

            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
