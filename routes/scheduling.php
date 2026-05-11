<?php

use App\Http\Scheduling\Auth\Controllers\LoginController;
use App\Http\Scheduling\Auth\Controllers\LogoutController;
use App\Http\Scheduling\Court\Controllers\AvailabilityController;
use App\Http\Scheduling\Court\Controllers\BlockReservationsController;
use App\Http\Scheduling\Court\Controllers\CourtsController;
use App\Http\Scheduling\Court\Controllers\CreateBlockReservationController;
use App\Http\Scheduling\Court\Controllers\CreateCourtController;
use App\Http\Scheduling\Court\Controllers\DeleteBlockReservationController;
use App\Http\Scheduling\Court\Controllers\DeleteReservationController;
use App\Http\Scheduling\Court\Controllers\ReservationsController;
use App\Http\Scheduling\Court\Controllers\ReserveCourtController;
use App\Http\Scheduling\Court\Controllers\ShowCreateBlockReservationsController;
use App\Http\Scheduling\Middleware\SchedulingAuthenticate;
use App\Http\Scheduling\Profile\Controllers\DeleteFacilitySocialLinkController;
use App\Http\Scheduling\Profile\Controllers\ProfileController;
use App\Http\Scheduling\Profile\Controllers\ProfileEditController;
use App\Http\Scheduling\Profile\Controllers\UpdateFacilityDetailsController;
use App\Http\Scheduling\Profile\Controllers\UpdateFacilityHoursController;
use App\Http\Scheduling\Profile\Controllers\UpdateFacilityPhotosController;
use App\Http\Scheduling\Profile\Controllers\UpdateFacilitySocialLinksController;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'show'])->name(Routes::LOGIN);
Route::post('/login', [LoginController::class, 'login'])->name(Routes::LOGIN_POST);
Route::post('/logout', [LogoutController::class, 'logout'])->name(Routes::LOGOUT);

Route::group(['middleware' => [SchedulingAuthenticate::class.':'.GuardEnum::FACILITY->value]], function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name(Routes::PROFILE);
    Route::get('/profile/edit', [ProfileEditController::class, 'show'])->name(Routes::PROFILE_EDIT);
    Route::post('/profile/photos', [UpdateFacilityPhotosController::class, 'update'])->name(Routes::PROFILE_UPDATE_PHOTOS);
    Route::patch('/profile/details', [UpdateFacilityDetailsController::class, 'update'])->name(Routes::PROFILE_UPDATE_DETAILS);
    Route::patch('/profile/hours', [UpdateFacilityHoursController::class, 'update'])->name(Routes::PROFILE_UPDATE_HOURS);
    Route::patch('/profile/social-links', [UpdateFacilitySocialLinksController::class, 'update'])->name(Routes::PROFILE_UPDATE_SOCIAL_LINKS);
    Route::delete('/profile/social-links/{platform}', [DeleteFacilitySocialLinkController::class, 'destroy'])->name(Routes::PROFILE_DELETE_SOCIAL_LINK);

    Route::get('/courts', [CourtsController::class, 'show'])->name(Routes::COURTS);
    Route::post('/courts', [CreateCourtController::class, 'store'])->name(Routes::CREATE_COURT);

    Route::post('/courts/{court:uuid}/reserve', [ReserveCourtController::class, 'reserve'])->name(Routes::RESERVE_COURT);

    Route::get('/reservations', [ReservationsController::class, 'show'])->name(Routes::RESERVATIONS);
    Route::delete('/reservations/{reservation:uuid}', [DeleteReservationController::class, 'destroy'])->name(Routes::DELETE_RESERVATION);

    Route::get('/availability', [AvailabilityController::class, 'show'])->name(Routes::AVAILABILITY);

    Route::get('/reservations/block-reservation', [BlockReservationsController::class, 'show'])->name(Routes::BLOCK_RESERVATION);
    Route::get('/reservations/block-reservation/create', [ShowCreateBlockReservationsController::class, 'show'])->name(Routes::SHOW_CREATE_BLOCK_RESERVATION);
    Route::post('/reservations/block-reservation', [CreateBlockReservationController::class, 'store'])->name(Routes::CREATE_BLOCK_RESERVATION);
    Route::delete('/reservations/block-reservation/{blockReservation:uuid}', [DeleteBlockReservationController::class, 'destroy'])->name(Routes::DELETE_BLOCK_RESERVATION);
});
