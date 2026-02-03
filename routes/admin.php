<?php

use Illuminate\Support\Facades\Route;

use App\Http\Admin\Controllers\AccountController;
use App\Http\Admin\Controllers\DashboardController;
use App\Http\Admin\Controllers\ReservationsController;
use App\Http\Admin\Court\Controllers\CourtsController;
use App\Http\Admin\Court\Controllers\CreateCourtController;

Route::get('/dashboard', DashboardController::class)->name('dashboard');
Route::get('/reservations', ReservationsController::class)->name('reservations');
Route::get('/account', AccountController::class)->name('account');

Route::prefix("courts")->name("courts.")->group(function () {
    Route::get('/', CourtsController::class)->name('index');
    Route::get('/create', [CreateCourtController::class, 'show'])->name('show');
    Route::post('/create', [CreateCourtController::class, 'store'])->name('store');
});
