<?php

use App\Http\Directory\Middleware\DirectoryInertiaTemplateMiddleware;
use App\Http\Scheduling\Middleware\SchedulingInertiaTemplateMiddleware;
use App\Http\Scoresheet\Middleware\ScoresheetInertiaTemplateMiddleware;
use App\Http\Shared\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            $tld = config('app.tld');

            Route::domain($tld)
                ->middleware('web')
                ->group(base_path('routes/web.php'));

            Route::domain("scheduling.{$tld}")
                ->middleware(['web', SchedulingInertiaTemplateMiddleware::class])
                ->name('scheduling.')
                ->group(base_path('routes/scheduling.php'));

            Route::domain("directory.{$tld}")
                ->middleware(['web', DirectoryInertiaTemplateMiddleware::class])
                ->name('directory.')
                ->group(base_path('routes/directory.php'));

            Route::domain("scoresheet.{$tld}")
                ->middleware(['web', ScoresheetInertiaTemplateMiddleware::class])
                ->name('scoresheet.')
                ->group(base_path('routes/scoresheet.php'));
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
        __DIR__.'/../app/Source/Directory/Commands',
        __DIR__.'/../app/Source/Ad/Commands',
        __DIR__.'/../app/Source/Scheduling/Facility/Commands',
        __DIR__.'/../app/Source/Scoresheet/Commands',
    ])
    ->withEvents(discover: [
        __DIR__.'/../app/Source/Directory/Listeners',
    ])
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $_exception, Request $request) {
            $status = $response->getStatusCode();

            $tld = config('app.tld');

            if ($request->getHost() === "directory.{$tld}") {
                Inertia::setRootView('directory');
            } elseif ($request->getHost() === "scheduling.{$tld}") {
                Inertia::setRootView('scheduling');
            } elseif ($request->getHost() === "scoresheet.{$tld}") {
                Inertia::setRootView('scoresheet');
            }

            return Inertia::render('ErrorPage', ['status' => $status])
                ->toResponse($request)
                ->setStatusCode($status);
        });
    })->create();
