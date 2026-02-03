<?php

use App\Http\Admin\Controllers\AccountController;
use App\Http\Admin\Controllers\CourtsController;
use App\Http\Admin\Controllers\DashboardController;
use App\Http\Admin\Controllers\ReservationsController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/court/{court}', CourtController::class)->name('court');

Route::prefix("admin")->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('admin.dashboard');
    Route::get('/reservations', ReservationsController::class)->name('admin.reservations');
    Route::get('/courts', CourtsController::class)->name('admin.courts');
    Route::get('/account', AccountController::class)->name('admin.account');
});
