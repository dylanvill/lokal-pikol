<?php

use App\Http\Customer\Auth\Controllers\SignUpController;
use App\Http\Customer\Facility\Controllers\FacilityController;
use App\Http\Customer\Facility\Controllers\FacilitiesController;
use Illuminate\Support\Facades\Route;

Route::get('/', FacilitiesController::class)->name('home');
Route::get('/sign-up', SignUpController::class)->name('sign-up');
Route::get('/facilities', fn() => redirect(route("home")))->name('login');
Route::get('/facilities/{facility:uuid}', FacilityController::class)->name('facility');
