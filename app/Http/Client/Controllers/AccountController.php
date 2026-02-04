<?php

namespace App\Http\Client\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        // You can add validation, database queries, etc. here
        return Inertia::render('client/account');
    }
}
