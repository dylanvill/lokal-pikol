<?php

use App\Http\Customer\Auth\Controllers\EmailVerificationController;
use App\Http\Customer\Auth\Controllers\LogoutController;
use App\Http\Customer\Auth\Controllers\SignUpController;
use App\Http\Customer\Auth\Controllers\VerificationNoticeController;
use App\Http\Customer\Facility\Controllers\FacilityController;
use App\Http\Customer\Facility\Controllers\FacilitiesController;
use Illuminate\Support\Facades\Route;

Route::get('/', FacilitiesController::class)->name('home');

Route::prefix("sign-up")->group(function () {
    Route::get('/', [SignUpController::class, 'show'])->name('sign-up')->middleware('guest:customer');
    Route::post('/', [SignUpController::class, 'store'])->name('sign-up.store')->middleware('guest:customer');
    Route::get('/notice', [VerificationNoticeController::class, 'show'])
        ->middleware('auth:customer')
        ->name('verification.notice');
    Route::post('/notice/send', [VerificationNoticeController::class, 'resend'])
        ->middleware(['auth:customer', 'throttle:6,1'])
        ->name('verification.send');
    Route::get('/verify/{id}/{hash}', EmailVerificationController::class)
        ->middleware(['auth:customer', 'signed'])
        ->name('verification.verify');
});

Route::post('/logout', LogoutController::class);

Route::get('/facilities', fn() => redirect(route("home")))->name('login');
Route::get('/facilities/{facility:uuid}', FacilityController::class)->name('facility');
