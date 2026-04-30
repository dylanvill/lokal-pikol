<?php

namespace App\Source\Scheduling\Court\Actions\CreateBlockReservation;

use App\Source\Scheduling\Court\Actions\CreateBlockReservation\Dtos\CreateBlockReservationData;
use App\Source\Scheduling\Court\Models\BlockReservation;
use Illuminate\Support\Str;

class CreateBlockReservation
{
    public function create(CreateBlockReservationData $data): BlockReservation
    {
        $blockReservation = new BlockReservation();
        $blockReservation->uuid = Str::uuid();
        $blockReservation->listing_id = $data->court->listing_id;
        $blockReservation->court_id = $data->court->id;
        $blockReservation->name = $data->name;
        $blockReservation->day_of_the_week = $data->dayOfTheWeek;
        $blockReservation->startTime = $data->startTime;
        $blockReservation->endTime = $data->endTime;
        $blockReservation->save();

        return $blockReservation;
    }
}