<?php

namespace App\Source\Customer\Actions\CreateCustomer;

use App\Source\Customer\Actions\CreateCustomer\Dtos\CreateCustomerData;
use App\Source\Customer\Mail\CustomerWelcomeEmail;
use App\Source\Customer\Models\Customer;
use Illuminate\Support\Facades\Mail;

class CreateCustomer
{
    public function create(CreateCustomerData $data): Customer
    {
        $customer = new Customer();
        $customer->user_id = $data->userId;
        $customer->first_name = $data->firstName;
        $customer->last_name = $data->lastName;
        $customer->email = $data->email;
        $customer->phone = $data->phone;
        $customer->save();

        Mail::to($customer->email)->send(new CustomerWelcomeEmail($customer));

        return $customer->refresh();
    }
}
