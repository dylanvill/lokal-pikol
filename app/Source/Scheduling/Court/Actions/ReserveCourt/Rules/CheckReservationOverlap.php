<?php

namespace App\Source\Scheduling\Court\Actions\ReserveCourt\Rules;

use App\Source\Scheduling\Court\Models\BlockReservation;
use App\Source\Scheduling\Court\Models\Reservation;
use Carbon\Carbon;
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
        $reservationOverlaps = Reservation::where('court_id', $this->courtId)
            ->whereDate('reservation_date', $this->reservationDate)
            ->where('start_time', '<', $this->endTime)
            ->where('end_time', '>', $this->startTime)
            ->exists();

        if ($reservationOverlaps) {
            $fail('This court is already reserved for the selected time.');

            return;
        }

        $dayOfWeek = Carbon::parse($this->reservationDate)->format('l');

        $blockOverlaps = BlockReservation::where('court_id', $this->courtId)
            ->where('day_of_the_week', $dayOfWeek)
            ->where('start_time', '<', $this->endTime)
            ->where('end_time', '>', $this->startTime)
            ->exists();

        if ($blockOverlaps) {
            $fail('This court is blocked for the selected time.');
        }
    }
}
