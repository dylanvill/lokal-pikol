<?php

use App\Http\Customer\Account\Controllers\UpdatePhoneNumberController;
use App\Http\Customer\Auth\Controllers\EmailVerificationController;
use App\Http\Customer\Auth\Controllers\GoogleOAuthCallbackController;
use App\Http\Customer\Auth\Controllers\GoogleOAuthRedirectController;
use App\Http\Customer\Auth\Controllers\LoginController;
use App\Http\Customer\Auth\Controllers\LogoutController;
use App\Http\Customer\Auth\Controllers\SignUpController;
use App\Http\Customer\Auth\Controllers\VerificationNoticeController;
use App\Http\Customer\Facility\Controllers\FacilityController;
use App\Http\Customer\Facility\Controllers\FacilitiesController;
use App\Http\Customer\Legal\Controllers\LegalController;
use App\Http\Customer\Reservation\Controllers\OnHoldNoticeController;
use App\Http\Customer\Reservation\Controllers\ReservationController;
use App\Http\Customer\Reservation\Controllers\ReservationsController;
use App\Http\Customer\Reservation\Controllers\ReserveCourtController;
use App\Http\Customer\Reservation\Controllers\UploadReceiptController;
use App\Http\Shared\Middleware\CustomerRoutesMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(CustomerRoutesMiddleware::class)->group(function () {
    /* ------------------------------ Public Routes ----------------------------- */
    Route::get('/', FacilitiesController::class)->name('home');
    Route::get('/privacy-policy', [LegalController::class, 'privacyPolicy'])->name('privacy-policy');
    Route::get('/terms-and-conditions', [LegalController::class, 'termsAndConditions'])->name('terms-and-conditions');
    Route::prefix("facilities")->group(function () {
        Route::get('/', fn() => redirect(route("home")))->name('index');
        Route::get('/{facility:uuid}', FacilityController::class)
            ->name('facility')
            ->middleware('can:canViewUnpublishedFacility,facility');
    });

    /* ------------------------------ Registration ------------------------------ */
    Route::prefix("sign-up")->group(function () {
        Route::get('/', [SignUpController::class, 'show'])->name('sign-up')->middleware('guest:customer');
        Route::post('/', [SignUpController::class, 'store'])->name('sign-up.store')->middleware('guest:customer');
    });

    /* ----------------------------- Authentication ----------------------------- */
    Route::get('/login', [LoginController::class, 'show'])->name('login.show')->middleware('guest:customer');
    Route::post('/login', [LoginController::class, 'login'])->name('login')->middleware('guest:customer');
    Route::get('/auth/google', GoogleOAuthRedirectController::class)->name('auth.google.redirect');
    Route::get('/auth/google/callback', GoogleOAuthCallbackController::class)->name('auth.google.callback');

    Route::middleware('auth:customer')->group(function () {
        Route::post('/logout', LogoutController::class)->name('logout');

        /* --------------------------------- Sign Up -------------------------------- */
        Route::prefix("sign-up")->name("sign-up.")->group(function () {
            Route::get('/notice', [VerificationNoticeController::class, 'show'])->name('verification.notice');
            Route::post('/notice/send', [VerificationNoticeController::class, 'resend'])->middleware('throttle:6,1')->name('verification.send');
            Route::get('/verify/{id}/{hash}', EmailVerificationController::class)->middleware('signed')->name('verification.verify');
        });

        /* --------------------------------- Account -------------------------------- */
        Route::prefix("account")->name("account.")->group(function () {
            Route::get('update-phone-number', [UpdatePhoneNumberController::class, 'show'])->name('update-phone-number.show');
            Route::post('update-phone-number', [UpdatePhoneNumberController::class, 'update'])->name('update-phone-number.update');
        });

        /* ------------------------------ Reservations ------------------------------ */
        Route::prefix("reservations")
            ->name("reservation.")
            ->middleware('verified')
            ->group(function () {
                Route::get('/', [ReservationsController::class, 'index'])->name('index');

                Route::middleware('can:customerCanView,reservation')->group(function () {
                    Route::get('/{reservation:uuid}/on-hold', OnHoldNoticeController::class)->name('on-hold-notice.show');
                    Route::get('/{reservation:uuid}', [ReservationController::class, 'show'])->name('show');
                    Route::get('/reserve/{reservation:uuid}', [ReserveCourtController::class, 'show'])->name('on-hold.show');
                    Route::post('/reserve/{reservation:uuid}/upload-receipt', UploadReceiptController::class)->name('upload-receipt');
                });
            });

        /* ------------------------------- Facilities ------------------------------- */
        Route::post('facility/{facility:uuid}/courts/{court:uuid}/reserve', [ReserveCourtController::class, 'store'])
            ->name('reservation.store')
            ->middleware(['auth:customer', 'verified', 'can:canViewUnpublishedFacility,facility']);
    });
});
