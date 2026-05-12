<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Shared\Contracts\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShowResetPasswordController extends Controller
{
    public function show(Request $request, string $token): Response
    {
        return Inertia::render('auth/reset-password', [
            'token' => $token,
            'email' => $request->query('email', ''),
        ]);
    }
}
