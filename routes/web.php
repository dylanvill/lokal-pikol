<?php

use App\Http\Customer\Court\Controllers\CourtController;
use App\Http\Customer\Court\Controllers\CourtsController;
use Illuminate\Support\Facades\Route;

Route::get('/', CourtsController::class)->name('home');
Route::get('/courts', fn() => redirect(route("home")))->name('login');
Route::get('/courts/{client:uuid}', CourtController::class)->name('court');
