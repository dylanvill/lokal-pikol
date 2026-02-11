<?php

namespace App\Source\Court\Actions\CourtSlotConversion;

use App\Source\Court\Actions\CourtSlotConversion\Dtos\CourtSlot;
use App\Source\Court\Models\CourtPricing;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class RangeToSlot
{
    /**
     * @param CourtPricing $courtPricing
     * @return CourtSlot[]
     */
    public static function convert(CourtPricing $pricing): array
    {
        $start = Carbon::parse($pricing->start_time);
        $end = Carbon::parse($pricing->end_time);

        $hourlySlots = [];
        while ($start < $end) {
            $slotStart = $start->format('H:i');
            $slotEnd = $start->addHour()->format('H:i');

            $hourlySlots[] = new CourtSlot(
                startTime: $slotStart,
                endTime: $slotEnd,
                price: $pricing->price
            );
        }

        return $hourlySlots;
    }

    /**
     * @param CourtPricing[] $courtPricings
     * @return CourtSlot[]
     */
    public static function covertMany(Collection $courtPricings): array
    {
        $allSlots = [];
        foreach ($courtPricings as $pricing) {
            $slots = self::convert($pricing);
            $allSlots = array_merge($allSlots, $slots);
        }

        return $allSlots;
    }
}
