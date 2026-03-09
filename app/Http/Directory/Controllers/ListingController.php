<?php

namespace App\Http\Directory\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Directory\Resources\ListingResource;
use App\Source\Directory\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListingController extends Controller
{
    public function __invoke(Request $request)
    {
        $all = Listing::with('socialLinks')->withMedia()->get();

        return Inertia::render('directory/listing', [
            'listings' => ListingResource::collection($all),
        ]);
    }
}
