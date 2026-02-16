<?php

use App\Http\Facility\Auth\Controllers\LoginController;
use App\Http\Facility\Auth\Controllers\LogoutController;
use Illuminate\Support\Facades\Route;

use App\Http\Facility\Controllers\AccountController;
use App\Http\Facility\Controllers\DashboardController;
use App\Http\Facility\Court\Controllers\CourtsController;
use App\Http\Facility\Court\Controllers\CreateCourtController;
use App\Http\Facility\Reservation\Controllers\ConfirmReservationController;
use App\Http\Facility\Reservation\Controllers\ReservationsController;

Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('/lpo-login', [LoginController::class, 'show'])->name('show');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    Route::post('/logout', LogoutController::class)->name('logout')->middleware('auth:facility');
});

Route::group(["middleware" => "auth:facility"], function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/account', AccountController::class)->name('account');

    Route::prefix("reservations")->name("reservations.")->group(function () {
        Route::get('/', ReservationsController::class)->name('list');
        Route::post('/{reservation:uuid}/confirm', ConfirmReservationController::class)->name('confirm');
    });

    Route::prefix("courts")->name("courts.")->group(function () {
        Route::get('/', CourtsController::class)->name('index');
        Route::get('/create', [CreateCourtController::class, 'show'])->name('show');
        Route::post('/create', [CreateCourtController::class, 'store'])->name('store');
    });
});
