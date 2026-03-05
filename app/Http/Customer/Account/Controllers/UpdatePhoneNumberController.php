<?php

namespace App\Http\Customer\Account\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Account\Requests\UpdatePhoneNumberRequest;
use App\Source\Customer\Models\Customer;
use Inertia\Inertia;

class UpdatePhoneNumberController extends Controller
{
    public function show()
    {
        return Inertia::render('customer/account/updatePhoneNumber');
    }


    public function update(UpdatePhoneNumberRequest $request)
    {
        /** @var Customer $customer */
        $customer = $request->user()->getProfileAttribute();

        $customer->phone = "+63" . $request->phoneNumber;
        $customer->save();

        return Inertia::flash('success', true)->back();
    }
}
