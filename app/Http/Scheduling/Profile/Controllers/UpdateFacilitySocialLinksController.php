<?php

namespace App\Http\Scheduling\Profile\Controllers;

use App\Http\Scheduling\Profile\Requests\UpdateFacilitySocialLinksRequest;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Directory\Actions\UpdateSocialLink\UpdateSocialLink;
use App\Source\Shared\Enums\SocialLinkEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UpdateFacilitySocialLinksController
{
    private const SUCCESS_MESSAGE_KEY = 'profile-changes-saved';

    public function update(UpdateFacilitySocialLinksRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;

        $service = new UpdateSocialLink($listing);

        foreach ($request->socialLinks as $link) {
            if (empty($link['url'])) {
                continue;
            }

            $service->update(SocialLinkEnum::from($link['platform']), $link['url']);
        }

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, 'Changes saved');

        return redirect()->back();
    }
}
