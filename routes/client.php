<?php

use App\Http\Client\Auth\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

use App\Http\Client\Controllers\AccountController;
use App\Http\Client\Controllers\DashboardController;
use App\Http\Client\Controllers\ReservationsController;
use App\Http\Client\Court\Controllers\CourtsController;
use App\Http\Client\Court\Controllers\CreateCourtController;


Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('/lpo-login', [LoginController::class, 'show'])->name('show');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
});

Route::group(["middleware" => "auth:client"], function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/reservations', ReservationsController::class)->name('reservations');
    Route::get('/account', AccountController::class)->name('account');

    Route::prefix("courts")->name("courts.")->group(function () {
        Route::get('/', CourtsController::class)->name('index');
        Route::get('/create', [CreateCourtController::class, 'show'])->name('show');
        Route::post('/create', [CreateCourtController::class, 'store'])->name('store');
    });
});
