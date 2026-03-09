<?php

namespace App\Source\Directory\Actions\GenerateListingRegistrationToken;

use App\Source\Directory\Actions\GenerateListingRegistrationToken\Dtos\ListingRegistrationLinkResult;
use App\Source\Directory\Models\ListingRegistrationToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GenerateListingRegistrationToken
{
    public function generate(): ListingRegistrationLinkResult
    {
        $unhashedToken = Str::random(32);

        $token = new ListingRegistrationToken();
        $token->token = Hash::make($unhashedToken);
        $token->expires_at = Carbon::now()->addHours(24);
        $token->save();

        return new ListingRegistrationLinkResult(
            uuid: $token->uuid,
            token: $unhashedToken,
            expiresAt: $token->expires_at->toDateTimeString(),
        );
    }
}
