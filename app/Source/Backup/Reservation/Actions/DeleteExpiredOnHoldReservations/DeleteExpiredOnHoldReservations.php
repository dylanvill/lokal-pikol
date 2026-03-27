<?php

namespace App\Source\Reservation\Actions\DeleteExpiredOnHoldReservations;

use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Logger\ReservationLogger;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Support\Carbon;

class DeleteExpiredOnHoldReservations
{
    const MINUTES_BEFORE_EXPIRATION = 10;

    public function __construct(protected ReservationLogger $logger) {}

    public function delete(): void
    {
        $reservations = Reservation::where('status', ReservationStatusEnum::ON_HOLD)
            ->where('created_at', '<', Carbon::now()->subMinutes(self::MINUTES_BEFORE_EXPIRATION))
            ->get();

        foreach ($reservations as $reservation) {
            $this->logger->info("Deleting expired on-hold reservation with ID: {$reservation->id}", [
                "facility_id" => $reservation->facility_id,
                "court_id" => $reservation->court_id,
                "reservation_date" => $reservation->reservation_date,
                "start_time" => $reservation->start_time,
                "end_time" => $reservation->end_time,
                "reservable_type" => $reservation->reservable_type,
                "reservable_id" => $reservation->reservable_id,
            ]);
            $reservation->delete();
        }
    }
}
