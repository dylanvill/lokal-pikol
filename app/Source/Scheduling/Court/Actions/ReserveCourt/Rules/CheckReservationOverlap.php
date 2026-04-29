<?php

namespace App\Source\Scheduling\Court\Actions\ReserveCourt\Rules;

use App\Source\Scheduling\Court\Models\Reservation;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CheckReservationOverlap implements ValidationRule
{
    public function __construct(
        private int $courtId,
        private string $reservationDate,
        private string $startTime,
        private string $endTime,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $overlaps = Reservation::where('court_id', $this->courtId)
            ->whereDate('reservation_date', $this->reservationDate)
            ->where('start_time', '<', $this->endTime)
            ->where('end_time', '>', $this->startTime)
            ->exists();

        if ($overlaps) {
            $fail('This court is already reserved for the selected time.');
        }
    }
}
