<?php

namespace App\Http\Facility\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        // You can add validation, database queries, etc. here
        return Inertia::render('facility/dashboard');
    }
}
