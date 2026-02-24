<?php

namespace App\Source\Court\Actions\CreateCourtBlockBooking;

use App\Source\Court\Actions\CreateCourtBlockBooking\Dtos\CreateCourtBlockBookingData;
use App\Source\Court\Models\BlockBooking;

class CreateCourtBlockBooking
{
    public function create(CreateCourtBlockBookingData $data): BlockBooking
    {
        $blockBooking = new BlockBooking();
        $blockBooking->court_id = $data->courtId;
        $blockBooking->name = $data->name;
        $blockBooking->day = $data->day->value;
        $blockBooking->start_time = $data->startTime;
        $blockBooking->end_time = $data->endTime;
        $blockBooking->save();

        return $blockBooking;
    }
}
