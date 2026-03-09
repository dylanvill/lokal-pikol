<?php

namespace App\Http\Directory\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListingController extends Controller
{
    public function __invoke(Request $request)
    {
        return Inertia::render('directory/listing');
    }
}
