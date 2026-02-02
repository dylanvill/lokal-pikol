<?php

namespace App\Source\Client\Actions\UpdateProfileImage;

use App\Source\Client\Models\Client;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use SplFileObject;

class UpdateProfileImage
{
    public function update(Client $client, SplFileObject $image): Client
    {
        $client->clearMediaCollection(MediaTypeEnum::CLIENT_PROFILE_PHOTO->value);

        $client->addMedia($image->getRealPath())
            ->usingFileName($image->getBasename())
            ->toMediaCollection(MediaTypeEnum::CLIENT_PROFILE_PHOTO->value);

        return $client;
    }
}
