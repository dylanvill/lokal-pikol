<?php

use App\Http\Directory\Controllers\CreateListingController;
use App\Http\Directory\Controllers\ListingController;
use App\Http\Directory\Controllers\ListingLegalController;
use App\Http\Directory\Controllers\RegistrationSuccessController;
use App\Http\Shared\Middleware\CustomerRoutesMiddleware;
use App\Source\Directory\Mail\ListingRegistrationEmail;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::get('/', ListingController::class)->name('home');
Route::get('/register', [CreateListingController::class, 'show'])->name('register.show')->middleware('signed');
Route::post('/register', [CreateListingController::class, 'store'])->name('register.store')->middleware(HandlePrecognitiveRequests::class);
Route::get('/register/{listing:uuid}/success', RegistrationSuccessController::class)->name('register.success');
Route::get('/privacy-policy', [ListingLegalController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/terms-and-conditions', [ListingLegalController::class, 'termsAndConditions'])->name('terms-and-conditions');

Route::get('/mail', function () {
    return new ListingRegistrationEmail('https://find.lokal-pikol.test/register?expires=1773053155&token=qHvszYBkluqQLXrrCro6G8MjusmUJPsj&uuid=4f89983d-010a-4a41-b70d-9324c8f3b0e7&signature=928c108437d85697cedae5ddbcd76737b41113a31937b21a41c2347269cd5934');
});
