<?php

namespace App\Source\Court\Actions\CourtSlotConversion;

use App\Source\Court\Actions\CourtSlotConversion\Dtos\CourtSlot;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\Range;

class SlotsToRange
{
    /**
     * Convert succeeding court slots into a single time range
     * 
     * @param CourtSlot[] $slots
     * @return Range
     */
    public static function convert(array $slots): Range
    {
        if (empty($slots)) {
            throw new \InvalidArgumentException('Slots array cannot be empty');
        }

        // Sort slots by start time to ensure proper order
        usort($slots, function ($a, $b) {
            return strcmp($a->startTime, $b->startTime);
        });

        // Get the earliest start time and latest end time
        $startTime = $slots[0]->startTime;
        $endTime = end($slots)->endTime;

        return new Range($startTime, $endTime);
    }
}
