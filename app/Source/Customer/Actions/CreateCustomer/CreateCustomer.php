<?php

namespace App\Source\Customer\Actions\CreateCustomer;

use App\Source\Customer\Actions\CreateCustomer\Dtos\CreateCustomerData;
use App\Source\Customer\Models\Customer;

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

        return $customer->refresh();
    }
}
