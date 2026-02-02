<?php

namespace App\Source\Client\Actions\CreateClient;

use App\Source\Client\Models\Client;
use App\Source\Client\Actions\CreateClient\Dtos\CreateClientSpec;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;

class CreateClient
{
    public function create(CreateClientSpec $data): Client
    {
        $client = Client::create($data->toArray());

        if (!empty($data->logo)) {
            $client->addMedia($data->logo->getRealPath())
                ->usingFileName($data->logo->getBasename())
                ->toMediaCollection(MediaTypeEnum::CLIENT_PROFILE_IMAGE->value);
        }

        return $client;
    }
}
