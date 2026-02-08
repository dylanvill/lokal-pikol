<?php

namespace App\Http\Customer\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Source\Court\Models\Court;
use Inertia\Inertia;
use Inertia\Response;

class CourtsController extends Controller
{

    public function __invoke(): Response
    {
        $courts = Court::all();
        return Inertia::render('home', ['courts' => $courts]);
    }
}
