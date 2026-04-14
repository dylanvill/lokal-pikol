<?php

namespace App\Http\Stacking\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StackingController
{
    public function __invoke()
    {
        return Inertia::render('home');
    }
}
