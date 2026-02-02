<?php

namespace App\Source\Client\Actions\CreateClient;

use App\Source\Client\Models\Client;
use App\Source\Client\Actions\CreateClient\Dtos\CreateClientSpec;

class CreateClient
{
    public function create(CreateClientSpec $data): Client
    {
        return Client::create($data->toArray());
    }
}
