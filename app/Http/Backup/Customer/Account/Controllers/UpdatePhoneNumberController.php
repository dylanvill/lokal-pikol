<?php

namespace App\Http\Customer\Account\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Customer\Account\Requests\UpdatePhoneNumberRequest;
use App\Http\Enums\GuardEnum;
use App\Source\Customer\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpdatePhoneNumberController extends Controller
{
    const FLASH = 'initial-phone-number-update-success';

    public function show(Request $request)
    {
        /** @var Customer $customer */
        $customer = $request->user(GuardEnum::CUSTOMER->value)->getProfileAttribute();

        if (!empty($customer->phone)) return redirect()->route('home');

        return Inertia::render('customer/account/updatePhoneNumber', [
            'fromAuth' => $request->query('fromAuth', false),
        ]);
    }


    public function update(UpdatePhoneNumberRequest $request)
    {
        /** @var Customer $customer */
        $customer = $request->user(GuardEnum::CUSTOMER->value)->getProfileAttribute();

        $customer->phone = "+63" . $request->phoneNumber;
        $customer->save();

        Inertia::flash(self::FLASH, true);

        return redirect()->route('home');
    }
}
