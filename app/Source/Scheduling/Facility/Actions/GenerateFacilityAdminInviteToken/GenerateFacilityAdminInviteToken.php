<?php

namespace App\Source\Scheduling\Facility\Actions\GenerateFacilityAdminInviteToken;

use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Facility\Dtos\FacilityAdminInviteMetadata;
use App\Source\Shared\Enums\InvitationTokenTypeEnum;
use App\Source\Shared\Models\InvitationToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class GenerateFacilityAdminInviteToken
{
    public function generate(Listing $listing, string $email, int $courtCount): string
    {
        $plainToken = Str::random(64);

        $metadata = new FacilityAdminInviteMetadata(
            listingId: $listing->id,
            email: $email,
            courtCount: $courtCount,
        );

        InvitationToken::create([
            'token' => hash('sha256', $plainToken),
            'type' => InvitationTokenTypeEnum::FACILITY_ADMIN_INVITE,
            'metadata' => $metadata->toArray(),
            'expires_at' => Carbon::now()->addDay(),
        ]);

        return $plainToken;
    }
}
