<?php

namespace App\Source\Listing\Actions\ValidateListingRegistrationToken;

use App\Source\Listing\Actions\ValidateListingRegistrationToken\Dtos\ValidateListingRegistrationTokenData;
use App\Source\Listing\Models\ListingRegistrationToken;
use Illuminate\Support\Facades\Hash;

class ValidateListingRegistrationToken
{
    public function validate(ValidateListingRegistrationTokenData $data): bool
    {
        $token = ListingRegistrationToken::where('uuid', $data->uuid)->first();
        
        if (empty($token)) return false;
        if (!Hash::check($data->token, $token->token)) return false;
        if ($token->expires_at->isPast()) return false;

        return true;
    }
}
