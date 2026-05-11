<?php

namespace App\Http\Scheduling\Profile\Controllers;

use App\Http\Scheduling\Profile\Requests\UpdateFacilityDetailsRequest;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Directory\Actions\UpdateListing\Dtos\UpdateListingData;
use App\Source\Directory\Actions\UpdateListing\UpdateListing;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UpdateFacilityDetailsController
{
    private const SUCCESS_MESSAGE_KEY = 'profile-changes-saved';

    public function update(UpdateFacilityDetailsRequest $request, UpdateListing $updateListing): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        $data = new UpdateListingData(
            name: $request->name,
            courtType: $request->courtType,
            numberOfCourts: $request->numberOfCourts,
            email: $request->email,
            phone: empty($request->phone) ? null : '+63'.$request->phone,
            googleMapsUrl: $request->googleMapsUrl,
            bookingUrl: $request->bookingUrl,
        );

        $updateListing->update($listing, $data);

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, 'Changes saved');

        return redirect()->back();
    }
}
