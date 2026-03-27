<?php

namespace App\Source\Shared\Actions\TimeToSlotConversion;

use App\Source\Court\Models\CourtPricing;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use Illuminate\Support\Carbon;

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

            $normalizedSlotEnd = $slotStart === "23:00" && $slotEnd === '00:00' ? '24:00' : $slotEnd;

            $hourlySlots[] = new CourtSlot(
                startTime: $slotStart,
                endTime: $normalizedSlotEnd,
                price: $range->price,
                isAvailable: null
            );
        }

        return $hourlySlots;
    }

    /**
     * @param Range[] $courtPricings
     * @return CourtSlot[]
     */
    public static function convertMany(array $courtPricings): array
    {
        $allSlots = [];
        foreach ($courtPricings as $pricing) {
            $slots = self::convert($pricing);
            $allSlots = array_merge($allSlots, $slots);
        }

        return $allSlots;
    }
}
