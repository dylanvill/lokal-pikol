<?php

namespace App\Source\Scheduling\Court\Actions\CreateReservation\Dtos;

use App\Source\Scheduling\Court\Models\Court;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;

readonly class CreateReservationData
{
    public function __construct(
        public FacilityAdmin $facilityAdmin,
        public Court $court,
        public string $name,
        public string $reservationDate,
        public string $startTime,
        public string $endTime,
    ) {}
}
