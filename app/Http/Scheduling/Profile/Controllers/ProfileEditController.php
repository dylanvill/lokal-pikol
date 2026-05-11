<?php

namespace App\Http\Scheduling\Profile\Controllers;

use App\Http\Scheduling\Profile\ApiModels\FacilityProfileEditApiModel;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileEditController extends Controller
{
    public function show(): Response
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing->load('socialLinks', 'media');

        return Inertia::render('profile/edit', [
            'facility' => FacilityProfileEditApiModel::fromListing($listing),
        ]);
    }
}
