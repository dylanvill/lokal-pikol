<?php

namespace App\Http\Customer\Court\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CourtsController extends Controller
{

    public function __invoke(): Response
    {
        return Inertia::render('home');
    }
}
