<?php

use App\Http\Shared\Middleware\CustomerRoutesMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(CustomerRoutesMiddleware::class)->group(function () {
    Route::get('/', function () {
        return "find";
    })->name('home');
});
