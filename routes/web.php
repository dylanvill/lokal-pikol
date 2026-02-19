<?php

use App\Http\Customer\Auth\Controllers\EmailVerificationController;
use App\Http\Customer\Auth\Controllers\LoginController;
use App\Http\Customer\Auth\Controllers\LogoutController;
use App\Http\Customer\Auth\Controllers\SignUpController;
use App\Http\Customer\Auth\Controllers\VerificationNoticeController;
use App\Http\Customer\Facility\Controllers\FacilityController;
use App\Http\Customer\Facility\Controllers\FacilitiesController;
use App\Http\Customer\Reservation\Controllers\ReservationController;
use App\Http\Customer\Reservation\Controllers\ReservationsController;
use App\Http\Customer\Reservation\Controllers\ReserveCourtController;
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

Route::post('/logout', LogoutController::class);

Route::get('/login', [LoginController::class, 'show'])->name('login.show')->middleware('guest:customer');
Route::post('/login', [LoginController::class, 'login'])->name('login')->middleware('guest:customer');

Route::prefix("facilities")->group(function () {
    Route::get('/', fn() => redirect(route("home")))->name('index');
    Route::get('/{facility:uuid}', FacilityController::class)->name('facility');
    Route::post('/{facility:uuid}/courts/{court:uuid}/reserve', [ReserveCourtController::class, 'store'])->name('reservation.store')->middleware('auth:customer');
});

Route::prefix("reservations")->name("reservation.")->group(function () {
    Route::get('/', [ReservationsController::class, 'index'])->name('index');
    Route::get('/{reservation:uuid}', [ReservationController::class, 'show'])->name('show');
    Route::get('/reserve/{reservation:uuid}', [ReserveCourtController::class, 'show'])->name('on-hold.show');
    Route::post('/reserve/{reservation:uuid}/upload-receipt', [ReserveCourtController::class, 'uploadReceipt'])->name('upload-receipt');
})->middleware('auth:customer');;

Route::get('/mailable', function () {
    return new ReservationPendingMail(Reservation::inRandomOrder()->first());
});
