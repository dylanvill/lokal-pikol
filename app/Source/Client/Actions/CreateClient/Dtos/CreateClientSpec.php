<?php

namespace App\Source\Client\Actions\CreateClient\Dtos;

use Illuminate\Contracts\Support\Arrayable;

readonly class CreateClientSpec implements Arrayable
{
    public function __construct(
        public string $name,
        public string $address,
        public string $email,
        public ?string $phone = null,
    ) {}

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'address' => $this->address,
            'email' => $this->email,
            'phone' => $this->phone,
        ];
    }
}
