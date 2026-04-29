<?php

namespace App\Source\Scheduling\Court\Actions\ReserveCourt\Dtos;

use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Court\Models\Court;

class ReserveCourtData
{
    public function __construct(
        public Listing $listing,
        public Court $court,
        public string $name,
        public string $reservationDate,
        public string $startTime,
        public string $endTime
    ) {}
}
