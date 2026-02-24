<?php

namespace App\Source\Court\Rules;

use App\Source\Court\Enums\BlockBookingDaysEnum;
use App\Source\Court\Models\Court;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\SlotsToRange;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NoExistingBlockBooking implements ValidationRule
{
    public function __construct(protected Court $court, protected BlockBookingDaysEnum $dayOfTheWeek) {}
    /**
     * Run the validation rule.
     *
     * @param string[] $value An array of strings, each in the format "start_time-end_time" (e.g., ["14:00-15:00", "15:00-16:00"])
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $range = SlotsToRange::convert(collect($value)->map(function ($slot) {
            $times = explode('-', $slot);
            return new CourtSlot($times[0], $times[1]);
        })->all());

        // Query existing block bookings for the same court and day
        $existingBookings = $this->court->blockBookings()
            ->where('day', $this->dayOfTheWeek->value)
            ->get();

        // Check for overlaps with existing bookings
        foreach ($existingBookings as $booking) {
            // Two time ranges overlap if:
            // range1.start < range2.end AND range1.end > range2.start
            if ($range->startTime < $booking->end_time && $range->endTime > $booking->start_time) {
                $fail('The selected time slots overlap with an existing block booking from ' . date("g:i A", strtotime($booking->start_time)) . ' to ' . date("g:i A", strtotime($booking->end_time)) . '.');
                return;
            }
        }
    }
}
