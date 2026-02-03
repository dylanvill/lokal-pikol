<?php

use App\Http\Admin\Controllers\AdminDashboardController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/court/{court}', CourtController::class)->name('court');

Route::prefix("admin")->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('admin.dashboard');
});
