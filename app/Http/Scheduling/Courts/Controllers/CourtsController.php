<?php

namespace App\Http\Scheduling\Courts\Controllers;

use App\Http\Shared\Contracts\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CourtsController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('courts/courts');
    }
}
