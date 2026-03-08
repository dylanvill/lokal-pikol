<?php

namespace App\Http\Listing\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ListingLegalController extends Controller
{
    public function termsAndConditions()
    {
        return inertia('listing/termsAndConditions');
    }

    public function privacyPolicy()
    {
        return inertia('listing/privacyPolicy');
    }
}
