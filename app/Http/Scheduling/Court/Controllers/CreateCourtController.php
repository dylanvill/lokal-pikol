<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\Requests\CreateCourtRequest;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Court\Actions\CreateCourt\CreateCourt;
use App\Source\Scheduling\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class CreateCourtController extends Controller
{
    public function store(CreateCourtRequest $request, CreateCourt $action): RedirectResponse
    {
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();

        $facilityAdmin = FacilityAdmin::where('user_id', $user->id)->firstOrFail();

        $listing = Listing::findOrFail($facilityAdmin->listing_id);

        $action->create(new CreateCourtData(
            listing: $listing,
            name: $request->name,
        ));

        return redirect()->route(Routes::getFullName(Routes::COURTS));
    }
}
