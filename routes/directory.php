<?php

use App\Http\Directory\Controllers\CreateListingController;
use App\Http\Directory\Controllers\ListingController;
use App\Http\Directory\Controllers\ListingLegalController;
use App\Http\Directory\Controllers\RegistrationSuccessController;
use App\Http\Directory\Controllers\TrackAdEventController;
use App\Http\Directory\Controllers\TrackListingEventController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::get('/', ListingController::class)->name('home');
Route::post('/track/{listing:uuid}/{event}', TrackListingEventController::class)->name('track-event');
Route::post('/ad/track/{ad:uuid}', TrackAdEventController::class)->name('track-ad-event');
Route::get('/register', [CreateListingController::class, 'show'])->name('register.show')->middleware('signed');
Route::post('/register', [CreateListingController::class, 'store'])->name('register.store')->middleware(HandlePrecognitiveRequests::class);
Route::get('/register/{listing:uuid}/success', RegistrationSuccessController::class)->name('register.success');
Route::get('/privacy-policy', [ListingLegalController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/terms-and-conditions', [ListingLegalController::class, 'termsAndConditions'])->name('terms-and-conditions');


Route::get('/bypass', [CreateListingController::class, 'bypass'])->name('register.bypass');