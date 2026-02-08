<?php

namespace App\Source\Court\Actions\CreateCourt;

use App\Source\Client\Models\Client;
use App\Source\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Court\Models\Court;

class CreateCourt
{
    public function create(CreateCourtData $data): Court
    {
        $court = new Court();
        $court->name = $data->name;
        $court->covered = $data->covered;
        $court->client_id = $data->clientId;
        $court->save();

        $this->createSlots($data->slots, $court);

        return $court->refresh()->load('courtSlots');
    }

    protected function createSlots(array $slots, Court $court)
    {
        foreach ($slots as $slot) {
            $court->courtSlots()->create($slot->toArray());
        }
    }
}
