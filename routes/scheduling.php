<?php

use App\Http\Scheduling\Auth\Controllers\LoginController;
use App\Http\Scheduling\Booking\Controllers\BookingsController;
use App\Http\Scheduling\Booking\Controllers\CalendarController;
use App\Http\Scheduling\Booking\Controllers\CreateBookingController;
use App\Http\Scheduling\Court\Controllers\CourtsController;
use App\Http\Scheduling\Court\Controllers\CreateCourtController;
use App\Http\Scheduling\Middleware\SchedulingAuthenticate;
use App\Http\Scheduling\Profile\Controllers\ProfileController;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'show'])->name(Routes::LOGIN);
Route::post('/login', [LoginController::class, 'login'])->name(Routes::LOGIN_POST);

Route::group(['middleware' => [SchedulingAuthenticate::class . ':' . GuardEnum::FACILITY->value]], function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name(Routes::PROFILE);

    Route::get('/courts', [CourtsController::class, 'show'])->name(Routes::COURTS);
    Route::post('/courts', [CreateCourtController::class, 'store'])->name(Routes::CREATE_COURT);

    Route::get('/bookings', [BookingsController::class, 'show'])->name(Routes::BOOKINGS);
    Route::get('/bookings/create', [CreateBookingController::class, 'show'])->name(Routes::BOOKINGS_CREATE);

    Route::get('/calendar', [CalendarController::class, 'show'])->name(Routes::CALENDAR);
});
