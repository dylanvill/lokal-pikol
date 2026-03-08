<?php

use App\Http\Listing\Controllers\CreateListingController;
use App\Http\Listing\Controllers\ListingController;
use App\Http\Listing\Controllers\ListingLegalController;
use App\Http\Shared\Middleware\CustomerRoutesMiddleware;
use App\Source\Listing\Mail\ListingRegistrationEmail;
use Illuminate\Support\Facades\Route;

Route::middleware(CustomerRoutesMiddleware::class)->group(function () {
    Route::get('/', ListingController::class)->name('home');
    Route::get('/register', [CreateListingController::class, 'show'])->name('register')->middleware('signed');
    Route::get('/privacy-policy', [ListingLegalController::class, 'privacyPolicy'])->name('privacy-policy');
    Route::get('/terms-and-conditions', [ListingLegalController::class, 'termsAndConditions'])->name('terms-and-conditions');

    Route::get('/mail', function () {
        return new ListingRegistrationEmail('https://find.lokal-pikol.test/register?expires=1773053155&token=qHvszYBkluqQLXrrCro6G8MjusmUJPsj&uuid=4f89983d-010a-4a41-b70d-9324c8f3b0e7&signature=928c108437d85697cedae5ddbcd76737b41113a31937b21a41c2347269cd5934');
    });
});
