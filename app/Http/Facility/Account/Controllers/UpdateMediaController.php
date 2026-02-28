<?php

namespace App\Http\Facility\Account\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Account\Requests\UpdateMediaRequest;
use App\Source\Facility\Models\Facility;
use App\Http\Enums\GuardEnum;
use Inertia\Inertia;

class UpdateMediaController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateMediaRequest $request)
    {
        /** @var Facility $facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();

        $hasCoverPhoto = $request->hasFile("coverPhoto");
        $hasProfilePhoto = $request->hasFile("profilePhoto");

        if ($hasCoverPhoto) {
            $facility->updateCoverPhoto($request->file("coverPhoto"));
        }

        if ($hasProfilePhoto) {
            $facility->updateProfilePhoto($request->file("profilePhoto"));
        }

        $imageMessage = $hasCoverPhoto && $hasProfilePhoto ? "Cover photo and profile photo updated successfully." :
            ($hasCoverPhoto ? "Cover photo updated successfully." : "Profile photo updated successfully.");

        return Inertia::flash("update-media-success", $imageMessage)->back();
    }
}
