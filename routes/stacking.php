<?php

use App\Http\Stacking\Controllers\StackingController;
use Illuminate\Support\Facades\Route;

Route::get('/', StackingController::class)->name('home');
