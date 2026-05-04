<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots\Resolvers;

use App\Source\Scheduling\Court\Models\Court;
use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use App\Source\Scheduling\Court\Actions\GenerateSlots\Dtos\ConflictRange;

abstract class BaseSlotConflictResolver
{
    /**
     * @param  array<CourtSlot>  $slots
     * @return array<CourtSlot>
     */
    public function resolveConflicts(array $slots, Court $court, string $date): array
    {
        $ranges = $this->conflictRangesFor($court, $date);

        if ($ranges->isEmpty()) {
            return $slots;
        }

        return array_map(fn (CourtSlot $slot) => $this->resolveSlot($slot, $ranges), $slots);
    }

    /**
     * @return Collection<int, ConflictRange>
     */
    abstract protected function conflictRangesFor(Court $court, string $date): Collection;

    /**
     * @param  Collection<int, ConflictRange>  $ranges
     */
    private function resolveSlot(CourtSlot $slot, Collection $ranges): CourtSlot
    {
        [$slotStart, $slotEnd] = array_map('trim', explode('-', $slot->slot));

        $slotStartTime = Carbon::createFromTimeString($slotStart);
        $slotEndTime = Carbon::createFromTimeString($slotEnd);

        foreach ($ranges as $range) {
            if ($slotStartTime->lt($range->end) && $slotEndTime->gt($range->start)) {
                return new CourtSlot(
                    slot: $slot->slot,
                    display: $slot->display,
                    isAvailable: false,
                    label: $range->label,
                );
            }
        }

        return $slot;
    }
}
