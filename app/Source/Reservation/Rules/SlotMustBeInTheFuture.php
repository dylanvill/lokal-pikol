<?php

namespace App\Source\Reservation\Rules;

use App\Source\Court\Models\Court;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SlotMustBeInTheFuture implements ValidationRule
{
    public function __construct(protected string $date) {}

    /**
     * 
     * @param string $value String format: "start_time-end_time" (e.g., "14:00-15:00")
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $date = $this->date;

        if (empty($value) || !$date) return;

        $currentDateTime = now();
        $reservationDateTime = \DateTime::createFromFormat('Y-m-d H:i', $date . ' ' . explode('-', $value)[0]);

        if ($reservationDateTime < $currentDateTime) {
            $fail('The selected time slot must be in the future.');
        }
    }
}
