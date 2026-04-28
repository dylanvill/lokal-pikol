<?php

use App\Http\Scheduling\Auth\Controllers\LoginController;
use App\Http\Scheduling\Bookings\Controllers\BookingsController;
use App\Http\Scheduling\Bookings\Controllers\CalendarController;
use App\Http\Scheduling\Bookings\Controllers\CreateBookingController;
use App\Http\Scheduling\Courts\Controllers\CourtsController;
use App\Http\Scheduling\Dashboard\Controllers\DashboardController;
use App\Http\Scheduling\Middleware\SchedulingAuthenticate;
use App\Http\Scheduling\Profile\Controllers\ProfileController;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'show'])->name(Routes::LOGIN);
Route::post('/login', [LoginController::class, 'login'])->name(Routes::LOGIN_POST);

Route::group(['middleware' => [SchedulingAuthenticate::class . ':' . GuardEnum::FACILITY->value]], function () {
    Route::get('/dashboard', DashboardController::class)->name(Routes::DASHBOARD);

    Route::get('/profile', [ProfileController::class, 'show'])->name(Routes::PROFILE);

    Route::get('/courts', [CourtsController::class, 'show'])->name(Routes::COURTS);

    Route::get('/bookings', [BookingsController::class, 'show'])->name(Routes::BOOKINGS);
    Route::get('/bookings/create', [CreateBookingController::class, 'show'])->name(Routes::BOOKINGS_CREATE);

    Route::get('/calendar', [CalendarController::class, 'show'])->name(Routes::CALENDAR);
});
