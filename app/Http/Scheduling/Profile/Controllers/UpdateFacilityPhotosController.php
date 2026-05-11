<?php

namespace App\Http\Scheduling\Profile\Controllers;

use App\Http\Scheduling\Profile\Requests\UpdateFacilityPhotosRequest;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Directory\Actions\UpdateListingMedia\UpdateListingMedia;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UpdateFacilityPhotosController
{
    private const SUCCESS_MESSAGE_KEY = 'profile-changes-saved';

    public function update(UpdateFacilityPhotosRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        $service = new UpdateListingMedia($listing);

        if ($request->profilePhoto !== null) {
            $service->setMediaType(MediaTypeEnum::LISTING_PROFILE_PHOTO)
                ->update($request->profilePhoto);
        }

        if ($request->coverPhoto !== null) {
            $service->setMediaType(MediaTypeEnum::LISTING_COVER_PHOTO)
                ->update($request->coverPhoto);
        }

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, 'Changes saved');

        return redirect()->back();
    }
}
