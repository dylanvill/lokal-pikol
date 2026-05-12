<?php

namespace App\Http\Scheduling\Account\Controllers;

use App\Http\Shared\Contracts\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('account/index');
    }
}
