<?php

namespace App\Source\Reservation\Actions\CreateReservation\Dtos;

use Illuminate\Contracts\Support\Arrayable;

readonly class CreateReservationData implements Arrayable
{
    public function __construct(
        public string $customerId,
        public string $facilityId,
        public string $courtId,
        public string $reservationDate,
        public string $startTime,
        public string $endTime,
        public string $status,
    ) {}

    public function toArray()
    {
        return [
            'customer_id' => $this->customerId,
            'facility_id' => $this->facilityId,
            'court_id' => $this->courtId,
            'reservation_date' => $this->reservationDate,
            'start_time' => $this->startTime,
            'end_time' => $this->endTime,
            'status' => $this->status,
        ];
    }
}
