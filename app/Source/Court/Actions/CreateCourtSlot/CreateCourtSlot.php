<?php

namespace App\Source\Court\Actions\CreateCourtSlot;

use App\Source\Court\Actions\CreateCourtSlot\Dtos\CreateCourtSlotData;
use App\Source\Court\Models\CourtSlot;

class CreateCourtSlot
{
    public function create(CreateCourtSlotData $data): CourtSlot
    {
        return CourtSlot::create($data->toArray());
    }
}