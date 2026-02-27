<?php

namespace App\Http\Facility\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Auth\Requests\OnboardingRequest;
use App\Source\Facility\Models\OnboardingToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function show(OnboardingRequest $request)
    {
        $onboarding = OnboardingToken::where('uuid', $request->id)->firstOrFail();

        /**
         * Check if hash is incorrect and if it is expired
         */
        if (!Hash::check($request->lpt, $onboarding->token)) abort(403);
        if (Carbon::now()->isAfter($onboarding->expires_at)) abort(403);
        if ($onboarding->used) abort(403);

        return Inertia::render('facility/auth/onboarding');
    }
}
