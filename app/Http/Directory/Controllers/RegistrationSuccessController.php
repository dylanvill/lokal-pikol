<?php

namespace App\Http\Directory\Controllers;

use App\Http\Directory\Resources\ListingResource;
use App\Http\Shared\Contracts\Controller;
use App\Source\Directory\Models\Listing;
use Inertia\Inertia;

class RegistrationSuccessController extends Controller
{
    public function __invoke(Listing $listing)
    {
        if (! session('registration-success')) {
            return redirect()->route('directory.home');
        }

        $listing->load('socialLinks', 'media');

        return Inertia::render('registrationSuccess', [
            'listing' => new ListingResource($listing),
        ]);
    }
}
