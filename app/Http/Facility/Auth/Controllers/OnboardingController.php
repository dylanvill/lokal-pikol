<?php

namespace App\Http\Facility\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Auth\Requests\OnboardingRequest;
use App\Source\Facility\Enums\CityEnum;
use App\Source\Facility\Models\OnboardingToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function show(OnboardingRequest $request)
    {
        $encrypted = Crypt::decryptString($request->d);
        /** @var array{uuid:string,plainToken:string,email:string,name:string} $parsed */
        $parsed = json_decode(urldecode($encrypted), true);

        if (empty($parsed)) abort(403);

        $onboarding = OnboardingToken::where('uuid', $parsed['uuid'])->firstOrFail();

        /**
         * Check if hash is incorrect and if it is expired
         */
        if (!Hash::check($parsed['plainToken'], $onboarding->token)) abort(403);
        if (Carbon::now()->isAfter($onboarding->expires_at)) abort(403);
        if ($onboarding->used) abort(403);

        return Inertia::render('facility/auth/onboarding', [
            "cities" => CityEnum::values(),
            "email" => $parsed['email'],
            "name" => $parsed['name'],
        ]);
    }
}
