<?php

namespace App\Source\Client\Actions\CreateClient;

use App\Source\Client\Models\Client;
use App\Source\Client\Actions\CreateClient\Dtos\CreateClientSpec;
use App\Source\Client\Actions\UpdateProfileImage\UpdateProfileImage;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;

class CreateClient
{
    public function create(CreateClientSpec $data): Client
    {
        $client = Client::create($data->toArray());

        if (!empty($data->logo)) {
            $updateImage = new UpdateProfileImage();
            $updateImage->update($client, $data->logo);
        }

        return $client;
    }
}
