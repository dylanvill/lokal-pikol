<?php

namespace App\Source\Client\Actions\UpdateCoverPhoto;

use App\Source\Client\Models\Client;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use SplFileObject;

class UpdateCoverPhoto
{
    public function update(Client $client, SplFileObject $image): Client
    {
        $client->clearMediaCollection(MediaTypeEnum::CLIENT_COVER_IMAGE->value);

        $client->addMedia($image->getRealPath())
            ->usingFileName($image->getBasename())
            ->toMediaCollection(MediaTypeEnum::CLIENT_COVER_IMAGE->value);

        return $client;
    }
}