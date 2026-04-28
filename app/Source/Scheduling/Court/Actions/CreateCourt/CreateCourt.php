<?php

namespace App\Source\Scheduling\Court\Actions\CreateCourt;

use App\Source\Scheduling\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Scheduling\Court\Models\Court;

class CreateCourt
{
    public function create(CreateCourtData $data): Court
    {
        $court = new Court();
        $court->listing_id = $data->listing->id;
        $court->name = $data->name;
        $court->save();

        return $court;
    }
}
