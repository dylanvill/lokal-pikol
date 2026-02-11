<?php

namespace App\Source\Authentication\Actions\CreateUser\Dtos;

use App\Source\Authentication\Enums\UserRoles;

readonly class CreateUserData
{
    public function __construct(
        public string $email,
        public string $password,
        public UserRoles $role,
    ) {}
}
