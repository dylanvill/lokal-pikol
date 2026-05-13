<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Scheduling\Auth\Requests\RegisterRequest;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Court\Actions\CreateCourt\CreateCourt;
use App\Source\Scheduling\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Scheduling\Facility\Actions\CreateAdminForListing\CreateAdminForListing;
use App\Source\Scheduling\Facility\Actions\CreateAdminForListing\Dtos\CreateFacilityAdminData;
use App\Source\Scheduling\Facility\Dtos\FacilityAdminInviteMetadata;
use App\Source\Shared\Models\InvitationToken;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StoreRegistrationController extends Controller
{
    public function __construct(
        private CreateAdminForListing $createAdminForListing,
        private CreateCourt $createCourt,
    ) {}

    public function store(RegisterRequest $request, string $token): RedirectResponse
    {
        $invitationToken = InvitationToken::findByPlainToken($token);

        if (! $invitationToken || $invitationToken->isUsed() || $invitationToken->isExpired()) {
            return redirect()->route(Routes::getFullName(Routes::LOGIN));
        }

        $metadata = FacilityAdminInviteMetadata::fromArray($invitationToken->metadata);
        $listing = Listing::findOrFail($metadata->listingId);

        $admin = DB::transaction(function () use ($request, $metadata, $listing) {
            $admin = $this->createAdminForListing->create(new CreateFacilityAdminData(
                listing: $listing,
                email: $metadata->email,
                password: $request->password,
                firstName: $request->firstName,
                lastName: $request->lastName,
                phoneNumber: $request->phoneNumber,
            ), skipActivation: true);

            for ($i = 1; $i <= $metadata->courtCount; $i++) {
                $this->createCourt->create(new CreateCourtData(
                    listing: $listing,
                    name: "Court {$i}",
                ));
            }

            return $admin;
        });

        $invitationToken->update(['used_at' => now()]);

        Auth::guard(GuardEnum::FACILITY->value)->login($admin->user);
        $request->session()->regenerate();

        return redirect()->route(Routes::getFullName(Routes::COURTS));
    }
}
