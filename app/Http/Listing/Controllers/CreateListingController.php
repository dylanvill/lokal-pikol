<?php

namespace App\Http\Listing\Controllers;

use App\Http\Controllers\Controller;

class CreateListingController extends Controller
{
    public function show()
    {
        return inertia('listing.create');
    }
}
