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
        $listings = Listing::with('socialLinks')->withMedia()->paginate(12);

        return Inertia::render('directory/listing', [
            'listings' => Inertia::scroll(fn() => ListingResource::collection($listings)),
        ]);
    }
}
