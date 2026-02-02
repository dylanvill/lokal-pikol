<?php

namespace App\Source\Court\Actions\CreateCourt;

use App\Source\Client\Models\Client;
use App\Source\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Court\Models\Court;

class CreateCourt
{
    public function create(CreateCourtData $data): Court
    {
        return Court::create($data->toArray());
    }
}
