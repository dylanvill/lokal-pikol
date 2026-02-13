<?php

namespace App\Http\Customer\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Auth\Requests\SignUpRequest;
use App\Http\Enums\GuardEnum;
use App\Source\Authentication\Actions\CreateUser\CreateUser;
use App\Source\Authentication\Actions\CreateUser\Dtos\CreateUserData;
use App\Source\Authentication\Enums\UserRoles;
use App\Source\Customer\Actions\CreateCustomer\CreateCustomer;
use App\Source\Customer\Actions\CreateCustomer\Dtos\CreateCustomerData;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SignUpController extends Controller
{
    public function show()
    {
        return Inertia::render('customer/auth/signUp');
    }

    public function store(SignUpRequest $request, CreateUser $createUserService, CreateCustomer $createCustomerService)
    {

        $user = $createUserService->create(
            new CreateUserData(
                email: $request->email,
                password: $request->password,
                role: UserRoles::CUSTOMER
            )
        );

        $createCustomerService->create(
            new CreateCustomerData(
                userId: $user->id,
                firstName: $request->firstName,
                lastName: $request->lastName,
                email: $request->email,
                phone: "+63{$request->phone}"
            )
        );

        Auth::guard(GuardEnum::CUSTOMER->value)->login($user);

        event(new Registered($user));

        return redirect()->route('verification.notice');
    }
}
