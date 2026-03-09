<?php

namespace App\Source\Directory\Actions\ValidateListingRegistrationToken;

use App\Source\Directory\Actions\ValidateListingRegistrationToken\Dtos\ValidateListingRegistrationTokenData;
use App\Source\Directory\Models\ListingRegistrationToken;
use Illuminate\Support\Facades\Hash;

class ValidateListingRegistrationToken
{
    public function validate(ValidateListingRegistrationTokenData $data): bool
    {
        $token = ListingRegistrationToken::where('uuid', $data->uuid)->first();
        
        if (empty($token)) return false; // If token isn't in the database
        if ($token->used) return false; // If token is used
        if ($token->expires_at->isPast()) return false; // If token is expired
        if (!Hash::check($data->token, $token->token)) return false; // If hash doesn't match

        return true;
    }
}
