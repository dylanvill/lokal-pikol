<?php

namespace App\Source\Court\Actions\CourtSlotConversion;

use App\Source\Court\Actions\CourtSlotConversion\Dtos\CourtSlot;
use App\Source\Court\Models\CourtPricing;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use App\Source\Court\Actions\CourtSlotConversion\Dtos\Range;

class RangeToSlot
{
    /**
     * @param CourtPricing $courtPricing
     * @return CourtSlot[]
     */
    public static function convert(Range $range): array
    {
        $start = Carbon::parse($range->startTime);
        $end = Carbon::parse($range->endTime);

        $hourlySlots = [];
        while ($start < $end) {
            $slotStart = $start->format('H:i');
            $slotEnd = $start->addHour()->format('H:i');

            $hourlySlots[] = new CourtSlot(
                startTime: $slotStart,
                endTime: $slotEnd,
                price: $range->price
            );
        }

        return $hourlySlots;
    }

    /**
     * @param Range[] $courtPricings
     * @return CourtSlot[]
     */
    public static function covertMany(array $courtPricings): array
    {
        $allSlots = [];
        foreach ($courtPricings as $pricing) {
            $slots = self::convert($pricing);
            $allSlots = array_merge($allSlots, $slots);
        }

        return $allSlots;
    }
}
