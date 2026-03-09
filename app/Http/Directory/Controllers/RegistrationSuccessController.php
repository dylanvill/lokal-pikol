<?php

namespace App\Http\Directory\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Directory\Resources\ListingResource;
use App\Source\Directory\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationSuccessController extends Controller
{
    public function __invoke(Listing $listing)
    {
        return Inertia::render('directory/registrationSuccess', [
            'listing' => new ListingResource($listing),
        ]);
    }
}
