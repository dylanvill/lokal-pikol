<?php

namespace App\Source\Customer\Actions\CreateCustomer\Dtos;

readonly class CreateCustomerData
{
    public function __construct(
        public string $userId,
        public string $firstName,
        public string $lastName,
        public string|null $phone,
        public string $email
    ) {}
}
