<?php

namespace App\Http\Admin\Court\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourtsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        // You can add validation, database queries, etc. here
        return Inertia::render('admin/courts/index');
    }
}
