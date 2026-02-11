<?php

namespace App\Source\Authentication\Actions\CreateUser;

use App\Source\Authentication\Actions\CreateUser\Dtos\CreateUserData;
use App\Source\Authentication\Models\User;

class CreateUser
{
    public function create(CreateUserData $data): User
    {
        $user = new User();
        $user->email = $data->email;
        $user->password = bcrypt($data->password);
        $user->role = $data->role->value;
        $user->save();

        return $user->refresh();
    }
}
