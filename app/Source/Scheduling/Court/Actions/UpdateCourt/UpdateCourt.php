<?php

namespace App\Source\Scheduling\Court\Actions\UpdateCourt;

use App\Source\Scheduling\Court\Actions\UpdateCourt\Dtos\UpdateCourtData;
use App\Source\Scheduling\Court\Models\Court;

class UpdateCourt
{
    public function update(UpdateCourtData $data): Court
    {
        $data->court->name = $data->name;
        $data->court->save();

        return $data->court;
    }
}
