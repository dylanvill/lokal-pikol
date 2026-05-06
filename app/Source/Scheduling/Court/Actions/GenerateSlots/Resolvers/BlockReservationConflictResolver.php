<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots\Resolvers;

use App\Source\Scheduling\Court\Actions\GenerateSlots\Dtos\ConflictRange;
use App\Source\Scheduling\Court\Models\Court;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class BlockReservationConflictResolver extends BaseSlotConflictResolver
{
    /**
     * @return Collection<int, ConflictRange>
     */
    protected function conflictRangesFor(Court $court, string $date): Collection
    {
        $dayOfWeek = strtolower(Carbon::parse($date)->dayName);

        return $court->blockReservations
            ->where('day_of_the_week', $dayOfWeek)
            ->map(fn ($block) => new ConflictRange(
                start: Carbon::createFromTimeString($block->start_time),
                end: Carbon::createFromTimeString($block->end_time),
                label: $block->name,
            ))
            ->values();
    }
}
