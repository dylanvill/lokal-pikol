<?php

use Illuminate\Support\Facades\Route;

use App\Http\Admin\Controllers\AccountController;
use App\Http\Admin\Controllers\CourtsController;
use App\Http\Admin\Controllers\DashboardController;
use App\Http\Admin\Controllers\ReservationsController;

Route::get('/dashboard', DashboardController::class)->name('dashboard');
Route::get('/reservations', ReservationsController::class)->name('reservations');
Route::get('/courts', CourtsController::class)->name('courts');
Route::get('/account', AccountController::class)->name('account');
