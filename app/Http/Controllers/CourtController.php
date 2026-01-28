<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CourtController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $court): Response
    {
        // You can add validation, database queries, etc. here
        return Inertia::render('court', [
            'court' => $court
        ]);
    }
}