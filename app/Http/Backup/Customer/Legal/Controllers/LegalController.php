<?php

namespace App\Http\Customer\Legal\Controllers;

use App\Http\Shared\Contracts\Controller;

class LegalController extends Controller
{

    public function privacyPolicy()
    {
        return inertia('customer/privacyPolicy');
    }

    public function termsAndConditions()
    {
        return inertia('customer/termsAndConditions');
    }
}
