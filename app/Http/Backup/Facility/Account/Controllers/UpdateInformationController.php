<?php

namespace App\Http\Facility\Account\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Facility\Account\Requests\UpdateInformationRequest;
use App\Source\Facility\Models\Facility;
use App\Http\Enums\GuardEnum;
use Inertia\Inertia;

class UpdateInformationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateInformationRequest $request)
    {
        /** @var Facility $facility */
        $facility = $request->user(GuardEnum::FACILITY->value)->getProfileAttribute();


        if ($request->has("address")) {
            $facility->address = $request->address;
        }

        if ($request->has("phone")) {
            $facility->phone = "+63" . $request->phone;
        }

        if ($request->has("description")) {
            $facility->description = $request->description;
        }

        if ($request->has("openingTime")) {
            $facility->opening_time = $request->openingTime;
        }

        if ($request->has("closingTime")) {
            $facility->closing_time = $request->closingTime;
        }

        if ($request->has("googleMapsUrl")) {
            $facility->google_maps_url = $request->googleMapsUrl;
        }

        $facility->save();

        return Inertia::flash("update-information-success", "Information updated successfully")->back();
    }
}
