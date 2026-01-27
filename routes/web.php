<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/court/{court}', function ($court) {
    return Inertia::render('court', [
        'court' => $court
    ]);
})->name('court');
