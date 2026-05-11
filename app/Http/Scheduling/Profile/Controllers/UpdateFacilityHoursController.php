<?php

namespace App\Http\Scheduling\Profile\Controllers;

use App\Http\Scheduling\Profile\Requests\UpdateFacilityHoursRequest;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Directory\Actions\UpdateListing\Dtos\UpdateListingData;
use App\Source\Directory\Actions\UpdateListing\UpdateListing;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UpdateFacilityHoursController
{
    private const SUCCESS_MESSAGE_KEY = 'profile-changes-saved';

    public function update(UpdateFacilityHoursRequest $request, UpdateListing $updateListing): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        $data = new UpdateListingData(
            openingTime: $request->openingTime,
            closingTime: $request->closingTime,
        );

        $updateListing->update($listing, $data);

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, 'Changes saved');

        return redirect()->back();
    }
}
