<?php

use App\Http\Scheduling\Auth\Controllers\LoginController;
use App\Http\Scheduling\Dashboard\DashboardController;
use App\Http\Scheduling\Middleware\SchedulingAuthenticate;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'show'])->name(Routes::LOGIN);
Route::post('/login', [LoginController::class, 'login'])->name(Routes::LOGIN_POST);

Route::group(['middleware' => [SchedulingAuthenticate::class . ':' . GuardEnum::FACILITY->value]], function () {
    Route::get('/dashboard', DashboardController::class)->name(Routes::DASHBOARD);
});
