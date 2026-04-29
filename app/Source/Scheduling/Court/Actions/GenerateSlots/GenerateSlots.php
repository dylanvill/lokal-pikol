<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots;

use Carbon\Carbon;
use Illuminate\Support\Collection;

class GenerateSlots
{
    public function generate(string $openingTime, string $closingTime, Collection $reservations): array
    {
        $current = Carbon::createFromTimeString($openingTime);
        $closing = Carbon::createFromTimeString($closingTime);

        if ($closing->lte($current)) {
            $closing->addDay();
        }

        $slots = [];

        while ($current->lt($closing)) {
            $next = $current->copy()->addHour();
            $slotValue = $current->format('H:i') . ' - ' . $next->format('H:i');

            $booked = $reservations->contains(function ($reservation) use ($current, $next) {
                $start = Carbon::createFromTimeString($reservation->start_time);
                $end = Carbon::createFromTimeString($reservation->end_time);

                return $start->lte($current) && $end->gte($next);
            });

            $slots[] = [
                'value' => $slotValue,
                'booked' => $booked,
            ];

            $current->addHour();
        }

        return $slots;
    }
}
