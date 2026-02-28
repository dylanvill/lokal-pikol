<?php

use App\Http\Customer\Auth\Controllers\EmailVerificationController;
use App\Http\Customer\Auth\Controllers\LoginController;
use App\Http\Customer\Auth\Controllers\LogoutController;
use App\Http\Customer\Auth\Controllers\SignUpController;
use App\Http\Customer\Auth\Controllers\VerificationNoticeController;
use App\Http\Customer\Facility\Controllers\FacilityController;
use App\Http\Customer\Facility\Controllers\FacilitiesController;
use App\Http\Customer\Reservation\Controllers\OnHoldNoticeController;
use App\Http\Customer\Reservation\Controllers\ReservationController;
use App\Http\Customer\Reservation\Controllers\ReservationsController;
use App\Http\Customer\Reservation\Controllers\ReserveCourtController;
use App\Http\Customer\Reservation\Controllers\UploadReceiptController;
use App\Source\Court\Actions\GetCourtAvailability\GetCourtAvailability;
use App\Source\Court\Actions\GetCourtCalendar\GetCourtCalendar;
use App\Source\Court\Models\Court;
use App\Source\Facility\Mail\OnboardingInviteEmail;
use App\Source\Reservation\Actions\SetReservationFees\SetReservationFees;
use App\Source\Reservation\Mail\ReservationConfirmedEmail;
use App\Source\Reservation\Mail\ReservationPendingMail;
use App\Source\Reservation\Models\Reservation;
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

Route::post('/logout', LogoutController::class)->middleware('auth:customer')->name('logout');

Route::get('/login', [LoginController::class, 'show'])->name('login.show')->middleware('guest:customer');
Route::post('/login', [LoginController::class, 'login'])->name('login')->middleware('guest:customer');

Route::prefix("facilities")->group(function () {
    Route::get('/', fn() => redirect(route("home")))->name('index');
    Route::get('/{facility:uuid}', FacilityController::class)
        ->name('facility')
        ->middleware('can:canViewUnpublishedFacility,facility');
    Route::post('/{facility:uuid}/courts/{court:uuid}/reserve', [ReserveCourtController::class, 'store'])
        ->name('reservation.store')
        ->middleware(['auth:customer', 'verified', 'can:canViewUnpublishedFacility,facility']);
});

Route::prefix("reservations")
    ->name("reservation.")
    ->middleware(['auth:customer', 'verified'])
    ->group(function () {
        Route::get('/', [ReservationsController::class, 'index'])->name('index');

        Route::middleware('can:customerCanView,reservation')->group(function () {
            Route::get('/{reservation:uuid}/on-hold', OnHoldNoticeController::class)->name('on-hold-notice.show');
            Route::get('/{reservation:uuid}', [ReservationController::class, 'show'])->name('show');
            Route::get('/reserve/{reservation:uuid}', [ReserveCourtController::class, 'show'])->name('on-hold.show');
            Route::post('/reserve/{reservation:uuid}/upload-receipt', UploadReceiptController::class)->name('upload-receipt');
        });
    });

Route::get('/mailable', function () {
    // return new OnboardingInviteEmail();
});

Route::get('/test', function () {
    dd((new GetCourtCalendar())->get(Court::find(1), '2026-02-24'));
});
