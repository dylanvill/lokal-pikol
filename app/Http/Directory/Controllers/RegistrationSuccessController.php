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

        if (!session('registration-success')) {
            return redirect()->route('directory.home');
        }

        return Inertia::render('directory/registrationSuccess', [
            'listing' => new ListingResource($listing),
        ]);
    }
}
