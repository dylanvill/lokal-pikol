<?php

namespace App\Http\Scheduling\Profile\Rules;

use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Court\Models\BlockReservation;
use App\Source\Scheduling\Court\Models\Reservation;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class NoConflictingHoursRule implements ValidationRule
{
    public const FLASH_KEY = 'hours-conflicts';

    public const BOUNDARY_OPENING = 'opening';

    public const BOUNDARY_CLOSING = 'closing';

    public function __construct(
        private readonly Listing $listing,
        private readonly string $boundary,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            return;
        }

        $newTime = $this->normaliseTime($value);
        $currentTime = $this->currentBoundaryTime();

        if ($currentTime === null) {
            return;
        }

        if (! $this->isTightening($newTime, $currentTime)) {
            return;
        }

        $courtIds = $this->listing->courts()->pluck('id');

        if ($courtIds->isEmpty()) {
            return;
        }

        $conflicts = $this->collectConflicts($courtIds, $newTime);

        if ($conflicts->isEmpty()) {
            return;
        }

        Inertia::flash(self::FLASH_KEY, $conflicts->all());

        $fail($this->boundary === self::BOUNDARY_OPENING
            ? 'Cannot tighten opening time — existing bookings start before this.'
            : 'Cannot tighten closing time — existing bookings end after this.');
    }

    private function currentBoundaryTime(): ?string
    {
        $stored = ($this->boundary === self::BOUNDARY_OPENING)
            ? $this->listing->opening_time
            : $this->listing->closing_time;

        if ($stored === null) {
            return null;
        }

        return $this->normaliseTime($stored);
    }

    private function isTightening(string $newTime, string $currentTime): bool
    {
        return $this->boundary === self::BOUNDARY_OPENING
            ? $newTime > $currentTime
            : $newTime < $currentTime;
    }

    private function collectConflicts(Collection $courtIds, string $newTime): Collection
    {
        $reservationConflicts = Reservation::query()
            ->whereIn('court_id', $courtIds)
            ->where('reservation_date', '>=', Carbon::today()->toDateString())
            ->when(
                $this->boundary === self::BOUNDARY_OPENING,
                fn ($query) => $query->where('start_time', '<', $newTime),
                fn ($query) => $query->where('end_time', '>', $newTime),
            )
            ->with('court')
            ->get()
            ->map(fn (Reservation $reservation) => $this->formatReservationConflict($reservation));

        $blockConflicts = BlockReservation::query()
            ->whereIn('court_id', $courtIds)
            ->when(
                $this->boundary === self::BOUNDARY_OPENING,
                fn ($query) => $query->where('start_time', '<', $newTime),
                fn ($query) => $query->where('end_time', '>', $newTime),
            )
            ->with('court')
            ->get()
            ->map(fn (BlockReservation $block) => $this->formatBlockConflict($block));

        return $reservationConflicts->concat($blockConflicts)->values();
    }

    /**
     * @return array{type: string, name: string, courtName: string, when: string, timeRange: string}
     */
    private function formatReservationConflict(Reservation $reservation): array
    {
        return [
            'type' => 'reservation',
            'name' => $reservation->name,
            'courtName' => $reservation->court->name,
            'when' => Carbon::parse($reservation->reservation_date)->format('l, j F Y'),
            'timeRange' => $this->formatTimeRange($reservation->start_time, $reservation->end_time),
        ];
    }

    /**
     * @return array{type: string, name: string, courtName: string, when: string, timeRange: string}
     */
    private function formatBlockConflict(BlockReservation $block): array
    {
        return [
            'type' => 'block',
            'name' => $block->name,
            'courtName' => $block->court->name,
            'when' => 'Every '.ucfirst($block->day_of_the_week),
            'timeRange' => $this->formatTimeRange($block->start_time, $block->end_time),
        ];
    }

    private function formatTimeRange(string $start, string $end): string
    {
        return Carbon::createFromTimeString($start)->format('g:i A')
            .' – '.Carbon::createFromTimeString($end)->format('g:i A');
    }

    private function normaliseTime(string $time): string
    {
        return substr($time, 0, 5);
    }
}
