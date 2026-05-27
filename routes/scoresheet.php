<?php

use App\Http\Scoresheet\Controllers\SessionController;
use App\Http\Scoresheet\Controllers\SubmitGameController;
use App\Http\Scoresheet\Routes;
use Illuminate\Support\Facades\Route;

Route::get('/session/{session:session_code}', [SessionController::class, 'show'])->name(Routes::SESSION_SHOW);
Route::post('/session/{session:session_code}/matches', [SubmitGameController::class, 'store'])->name(Routes::SESSION_MATCHES_STORE);
