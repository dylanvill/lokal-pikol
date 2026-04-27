<?php

namespace App\Source\Scheduling\Facility\Actions\CreateAdminForListing;

use App\Source\Authentication\Models\User;
use App\Source\Scheduling\Facility\Actions\CreateAdminForListing\Dtos\CreateFacilityAdminData;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;

class CreateAdminForListing
{
    public function create(CreateFacilityAdminData $data, bool $skipActivation = true): FacilityAdmin
    {
        $user = new User();
        $user->email = $data->email;
        if ($skipActivation) {
            $user->password = bcrypt($data->password);
            $user->email_verified_at = now();
        }
        $user->save();

        $admin = new FacilityAdmin();
        $admin->user_id = $user->id;
        $admin->listing_id = $data->listing->id;
        $admin->email = $data->email;
        $admin->first_name = $data->firstName;
        $admin->last_name = $data->lastName;
        $admin->phone_number = $data->phoneNumber;

        $admin->save();

        return $admin;
    }
}
