<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots;

use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class GenerateSlots
{

    /**
     * @param string $openingTime
     * @param string $closingTime
     * @param Collection $reservations
     * @return Array<CourtSlot>
     */
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
            $slot = $current->format('H:i') . ' - ' . $next->format('H:i');
            $display = $current->format('g:i A') . ' - ' . $next->format('g:i A');

            $isAvailable = $reservations->every(function ($reservation) use ($current, $next) {
                $start = Carbon::createFromTimeString($reservation->start_time);
                $end = Carbon::createFromTimeString($reservation->end_time);

                return $start->gte($next) || $end->lte($current);
            });

            $slots[] = new CourtSlot(
                slot: $slot,
                display: $display,
                isAvailable: $isAvailable,
            );

            $current->addHour();
        }

        return $slots;
    }
}
