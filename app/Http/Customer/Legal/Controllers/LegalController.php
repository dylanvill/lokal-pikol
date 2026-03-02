<?php

namespace App\Http\Customer\Legal\Controllers;

use App\Http\Controllers\Controller;

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
