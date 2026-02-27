<?php

namespace App\Source\Facility\Actions\CreateFacilityOnboardingToken;

use App\Source\Facility\Actions\CreateFacilityOnboardingToken\Dtos\CreateFacilityOnboardingTokenData;
use App\Source\Facility\Actions\CreateFacilityOnboardingToken\Dtos\CreateFacilityOnboardingTokenResult;
use App\Source\Facility\Models\OnboardingToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateFacilityOnboardingToken
{
    public function create(CreateFacilityOnboardingTokenData $data): CreateFacilityOnboardingTokenResult
    {
        $plainToken = Str::random(32);

        $token = new OnboardingToken();
        $token->name = $data->name;
        $token->email = $data->email;
        $token->token = Hash::make($plainToken);
        $token->expires_at = Carbon::now()->addHours(24)->toDateTimeString();
        $token->save();

        return new CreateFacilityOnboardingTokenResult(
            id: $token->id,
            uuid: $token->uuid,
            name: $token->name,
            email: $token->email,
            plainToken: $plainToken,
            expiresAt: $token->expires_at,
        );
    }
}
