<?php

namespace App\Source\Scheduling\Court\Shared\Helpers;

use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Carbon\Carbon;

class RangeToCourtSlot
{
    /**
     * @return array<CourtSlot>
     */
    public function convert(string $startTime, string $endTime): array
    {
        $current = Carbon::createFromTimeString($startTime);
        $end = Carbon::createFromTimeString($endTime);

        if ($end->lte($current)) {
            $end->addDay();
        }

        $slots = [];

        while ($current->lt($end)) {
            $next = $current->copy()->addHour();

            $slots[] = new CourtSlot(
                slot: $current->format('H:i') . ' - ' . $next->format('H:i'),
                display: $current->format('g:i A') . ' - ' . $next->format('g:i A'),
                isAvailable: true,
                label: null,
            );

            $current->addHour();
        }

        return $slots;
    }
}
