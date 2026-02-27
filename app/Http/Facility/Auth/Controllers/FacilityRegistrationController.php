<?php

namespace App\Http\Facility\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Auth\Requests\FacilityRegistrationRequest;
use App\Source\Authentication\Actions\CreateUser\CreateUser;
use App\Source\Authentication\Actions\CreateUser\Dtos\CreateUserData;
use App\Source\Authentication\Enums\UserRoles;
use App\Source\Facility\Actions\CreateFacility\CreateFacility;
use App\Source\Facility\Actions\CreateFacility\Dtos\CreateFacilityData;
use App\Source\Facility\Enums\CityEnum;
use App\Source\Facility\Models\OnboardingToken;

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
            city: CityEnum::from($request->city),
            address: $request->address,
            googleMapsUrl: $request->googleMapsUrl,
            phone: $request->phone,
            openingTime: $request->openingTime,
            closingTime: $request->closingTime,
            description: $request->description,
            coverPhoto: $request->file('coverPhoto'),
            profilePhoto: $request->file('profilePhoto'),
        ));

        dd("Sumakses wew nice ka wan");
    }
}
