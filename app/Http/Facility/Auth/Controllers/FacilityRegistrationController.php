<?php

namespace App\Http\Facility\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Http\Facility\Auth\Requests\FacilityRegistrationRequest;
use App\Source\Authentication\Actions\CreateUser\CreateUser;
use App\Source\Authentication\Actions\CreateUser\Dtos\CreateUserData;
use App\Source\Authentication\Enums\UserRoles;
use App\Source\Facility\Actions\CreateFacility\CreateFacility;
use App\Source\Facility\Actions\CreateFacility\Dtos\CreateFacilityData;
use App\Source\Facility\Enums\CityEnum;
use App\Source\Facility\Models\OnboardingToken;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FacilityRegistrationController extends Controller
{
    public function __invoke(FacilityRegistrationRequest $request, CreateUser $createUser, CreateFacility $createFacility)
    {
        $onboarding = OnboardingToken::where('uuid', $request->onboardingId)->firstOrFail();
        $onboarding->markAsUsed();

        $user = $createUser->create(new CreateUserData(
            email: $request->email,
            password: $request->password,
            role: UserRoles::FACILITY,
        ));

        $user->email_verified_at = now();
        $user->save();

        $facility = $createFacility->create(new CreateFacilityData(
            userId: $user->id,
            name: $request->name,
            email: $request->email,
            city: CityEnum::from($request->city),
            address: $request->address,
            googleMapsUrl: $request->googleMapsUrl,
            phone: $request->phone,
            openingTime: $request->openingTime,
            closingTime: $request->closingTime,
            description: $request->description,
            coverPhoto: $request->file('coverPhoto'),
            profilePhoto: $request->file('profilePhoto'),
            paymentQrCode: $request->file('paymentQrCode'),
        ));

        Auth::guard(GuardEnum::FACILITY->value)->login($user, true);

        Inertia::flash('registration-success', 'Your facility is now part of a system built by the community, for the community. We created Lokal Pikol to support court owners like you — the ones who keep the games going and the community thriving. We are very grateful to partner with you. Let\'s grow the sport together!');

        return redirect()->route('facility.dashboard');
    }
}
