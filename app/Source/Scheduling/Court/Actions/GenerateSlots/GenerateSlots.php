<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots;

use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Carbon\Carbon;

// Generates plain hourly slots between two times. Does not compute availability.
class GenerateSlots
{
    /**
     * @return array<CourtSlot>
     */
    public function generate(string $startTime, string $endTime): array
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
                display: $current->format('h:i A') . ' - ' . $next->format('h:i A'),
                isAvailable: true,
                label: null,
            );

            $current->addHour();
        }

        return $slots;
    }
}
