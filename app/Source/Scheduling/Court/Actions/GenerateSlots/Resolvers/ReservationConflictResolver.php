<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots\Resolvers;

use App\Source\Scheduling\Court\Actions\GenerateSlots\Dtos\ConflictRange;
use App\Source\Scheduling\Court\Models\Court;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class ReservationConflictResolver extends BaseSlotConflictResolver
{
    /**
     * @return Collection<int, ConflictRange>
     */
    protected function conflictRangesFor(Court $court, string $date): Collection
    {
        return $court->reservations
            ->where('reservation_date', $date)
            ->map(fn ($reservation) => new ConflictRange(
                start: Carbon::createFromTimeString($reservation->start_time),
                end: Carbon::createFromTimeString($reservation->end_time),
                label: $reservation->name,
            ))
            ->values();
    }
}
