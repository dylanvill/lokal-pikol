<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Inertia\Inertia;

class EmailVerificationController extends Controller
{
    public function __invoke(EmailVerificationRequest $request)
    {
        $request->fulfill();

        Inertia::flash('verificationSuccess', true);

        return redirect()->route('home');
    }
}
