<?php

use App\Http\Scheduling\Auth\Controllers\LoginController;
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
use App\Http\Scheduling\Profile\Controllers\ProfileController;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Enums\GuardEnum;
use Illuminate\Support\Facades\Route;

Route::get('/login', [LoginController::class, 'show'])->name(Routes::LOGIN);
Route::post('/login', [LoginController::class, 'login'])->name(Routes::LOGIN_POST);

Route::group(['middleware' => [SchedulingAuthenticate::class.':'.GuardEnum::FACILITY->value]], function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name(Routes::PROFILE);

    Route::get('/courts', [CourtsController::class, 'show'])->name(Routes::COURTS);
    Route::post('/courts', [CreateCourtController::class, 'store'])->name(Routes::CREATE_COURT);

    Route::post('/courts/{court:uuid}/reserve', [ReserveCourtController::class, 'reserve'])->name(Routes::RESERVE_COURT);

    Route::get('/reservations', [ReservationsController::class, 'show'])->name(Routes::RESERVATIONS);
    Route::delete('/reservations/{reservation:uuid}', [DeleteReservationController::class, 'destroy'])->name(Routes::DELETE_RESERVATION);

    Route::get('/reservations/block-reservation', [BlockReservationsController::class, 'show'])->name(Routes::BLOCK_RESERVATION);
    Route::get('/reservations/block-reservation/create', [ShowCreateBlockReservationsController::class, 'show'])->name(Routes::SHOW_CREATE_BLOCK_RESERVATION);
    Route::post('/reservations/block-reservation', [CreateBlockReservationController::class, 'store'])->name(Routes::CREATE_BLOCK_RESERVATION);
    Route::delete('/reservations/block-reservation/{blockReservation:uuid}', [DeleteBlockReservationController::class, 'destroy'])->name(Routes::DELETE_BLOCK_RESERVATION);
});
