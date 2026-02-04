<?php

use App\Http\Controllers\CourtController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/courts', fn () => redirect(route("home")))->name('login');

Route::get('/court/{court}', CourtController::class)->name('court');
