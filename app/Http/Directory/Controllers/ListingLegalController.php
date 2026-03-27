<?php

namespace App\Http\Directory\Controllers;

use App\Http\Shared\Contracts\Controller;
use Illuminate\Http\Request;

class ListingLegalController extends Controller
{
    public function termsAndConditions()
    {
        return inertia('termsAndConditions');
    }

    public function privacyPolicy()
    {
        return inertia('privacyPolicy');
    }
}
