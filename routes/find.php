<?php

use App\Http\Listing\Controllers\ListingController;
use App\Http\Listing\Controllers\ListingLegalController;
use App\Http\Shared\Middleware\CustomerRoutesMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(CustomerRoutesMiddleware::class)->group(function () {
    Route::get('/', ListingController::class)->name('home');
    Route::get('/privacy-policy', [ListingLegalController::class, 'privacyPolicy'])->name('privacy-policy');
    Route::get('/terms-and-conditions', [ListingLegalController::class, 'termsAndConditions'])->name('terms-and-conditions');
});
