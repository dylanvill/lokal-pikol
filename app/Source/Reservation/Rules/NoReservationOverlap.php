<?php

namespace App\Source\Reservation\Rules;

use App\Source\Court\Models\Court;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NoReservationOverlap implements ValidationRule
{
    public function __construct(
        protected Court $court,
        protected string $date
    ) {}

    /**
     * 
     * @param array $slots
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $slots, Closure $fail): void
    {
        $court = $this->court;
        $date = $this->date;

        if (!$court instanceof Court || empty($slots) || !$date) return;

        // Parse requested slots into time ranges
        $requestedRanges = [];
        foreach ($slots as $slot) {
            if (preg_match('/^(\d{2}:\d{2})-(\d{2}:\d{2})$/', $slot, $matches)) {
                $requestedRanges[] = [
                    'start' => $matches[1] . ':00', // Convert HH:MM to HH:MM:SS
                    'end' => $matches[2] . ':00'
                ];
            }
        }

        if (empty($requestedRanges)) return;

        // Get existing reservations for this court on the same date
        $existingReservations = Reservation::where('court_id', $court->id)
            ->where('reservation_date', $date)
            ->whereNot('status', ReservationStatusEnum::CANCELLED->value)
            ->get(['start_time', 'end_time']);

        // Check for overlaps
        foreach ($requestedRanges as $requestedRange) {
            foreach ($existingReservations as $existing) {
                // Two ranges overlap if: start1 < end2 AND start2 < end1
                if (
                    $requestedRange['start'] < $existing->end_time &&
                    $existing->start_time < $requestedRange['end']
                ) {
                    $fail('The selected time slots overlap with an existing reservation.');
                }
            }
        }
    }
}
