<?php

namespace App\Http\Scheduling\Profile\Controllers;

use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Directory\Actions\UpdateSocialLink\UpdateSocialLink;
use App\Source\Shared\Enums\SocialLinkEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DeleteFacilitySocialLinkController
{
    private const SUCCESS_MESSAGE_KEY = 'profile-changes-saved';

    public function destroy(SocialLinkEnum $platform): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        (new UpdateSocialLink($listing))->delete($platform);

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, 'Changes saved');

        return redirect()->back();
    }
}
