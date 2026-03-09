<?php

namespace App\Http\Directory\Controllers;

use App\Http\Controllers\Controller;

class CreateListingController extends Controller
{
    public function show()
    {
        return inertia('directory/register');
    }
}
