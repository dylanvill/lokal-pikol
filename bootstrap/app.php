<?php

use App\Http\Booking\Middleware\BookingInertiaTemplateMiddleware;
use App\Http\Directory\Middleware\DirectoryInertiaTemplateMiddleware;
use App\Http\Shared\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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

            Route::domain("facility.{$tld}")
                ->middleware('web')
                ->name('facility.')
                ->group(base_path('routes/facility.php'));

            Route::domain("booking.{$tld}")
                ->middleware(['web', BookingInertiaTemplateMiddleware::class])
                ->name('booking.')
                ->group(base_path('routes/booking.php'));

            Route::domain("directory.{$tld}")
                ->middleware(['web', DirectoryInertiaTemplateMiddleware::class])
                ->name('directory.')
                ->group(base_path('routes/directory.php'));
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
        __DIR__ . '/../app/Source/Directory/Commands'
    ])->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {

            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
