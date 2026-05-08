<?php

namespace App\Http\Scheduling\Court\ApiModels;

use App\Source\Scheduling\Court\Models\BlockReservation;
use App\Source\Scheduling\Court\Models\Reservation;
use Carbon\Carbon;
use Spatie\LaravelData\Data;

class ReservationCalendarItemApiModel extends Data
{
    private function __construct(
        public string $id,
        public string $type,
        public string $title,
        public string $start,
        public string $end,
        public string $courtName,
        public string $dateDisplay,
        public string $timeDisplay,
    ) {}

    public static function createFromReservation(Reservation $reservation): self
    {
        return new self(
            id: $reservation->uuid,
            type: 'reservation',
            title: $reservation->name,
            start: "{$reservation->reservation_date}T{$reservation->start_time}",
            end: "{$reservation->reservation_date}T{$reservation->end_time}",
            courtName: $reservation->court->name,
            dateDisplay: Carbon::parse($reservation->reservation_date)->format('l, j F Y'),
            timeDisplay: self::formatTimeRange($reservation->start_time, $reservation->end_time),
        );
    }

    public static function createFromBlockReservation(BlockReservation $blockReservation, Carbon $date): self
    {
        $dateStr = $date->format('Y-m-d');

        return new self(
            id: $blockReservation->uuid,
            type: 'block_reservation',
            title: "(Blocked) {$blockReservation->name}",
            start: "{$dateStr}T{$blockReservation->start_time}",
            end: "{$dateStr}T{$blockReservation->end_time}",
            courtName: $blockReservation->court->name,
            dateDisplay: 'Every '.ucfirst($blockReservation->day_of_the_week),
            timeDisplay: self::formatTimeRange($blockReservation->start_time, $blockReservation->end_time),
        );
    }

    private static function formatTimeRange(string $startTime, string $endTime): string
    {
        $start = Carbon::createFromFormat('H:i:s', $startTime)->format('g:ia');
        $end = Carbon::createFromFormat('H:i:s', $endTime)->format('g:ia');

        return "{$start} – {$end}";
    }
}
