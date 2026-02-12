<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationNoticeController extends Controller
{
    public function show()
    {
        return Inertia::render('customer/auth/signUpVerification');
    }

    public function resend(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();

        return Inertia::flash('success', true)->back();
    }
}
