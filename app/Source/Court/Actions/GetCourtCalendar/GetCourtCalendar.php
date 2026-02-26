<?php

namespace App\Source\Court\Actions\GetCourtCalendar;

use App\Source\Court\Actions\GetCourtCalendar\Dtos\BlockBookingCalendarItemMetadata;
use App\Source\Court\Actions\GetCourtCalendar\Dtos\CourtCalendarItem;
use App\Source\Court\Actions\GetCourtCalendar\Dtos\ReservationCalendarItemMetadata;
use App\Source\Court\Enums\BlockBookingDaysEnum;
use App\Source\Court\Models\BlockBooking;
use App\Source\Court\Models\Court;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Support\Carbon;

class GetCourtCalendar
{
    /**
     * @param Court $court
     * @param string $date in Y-m-d format
     * @return array<CourtCalendarItem>
     */
    public function get(Court $court, string $date): array
    {
        $carbonDate = Carbon::createFromFormat('Y-m-d', $date);
        $month = $carbonDate->month;
        $year = $carbonDate->year;

        $court->load([
            'blockBookings',
            'reservations' => function ($query) use ($month, $year) {
                $query->whereMonth('reservation_date', $month)
                    ->whereYear('reservation_date', $year)
                    ->whereIn('status', [ReservationStatusEnum::CONFIRMED->value, ReservationStatusEnum::PENDING->value]);
            },
            'reservations.reservable'
        ]);

        $items = [];

        /** @var Reservation $reservation */
        foreach ($court->reservations as $reservation) {
            $items[] = new CourtCalendarItem(
                id: $reservation->id,
                uuid: $reservation->uuid,
                model: class_basename($reservation),
                label: !empty($reservation->custom_title) ? $reservation->custom_title : $reservation->reservable->reservationNameDisplay(),
                reservationDate: $reservation->reservation_date->toDateString(),
                startTime: $reservation->start_time,
                endTime: $reservation->end_time,
                metadata: new ReservationCalendarItemMetadata(ReservationStatusEnum::from($reservation->status))
            );
        }

        // Add block bookings to calendar
        /** @var BlockBooking $blockBooking */
        foreach ($court->blockBookings as $blockBooking) {
            // Get all dates in the month that match this block booking's day of week
            $matchingDates = $this->getDatesForDayOfWeek($carbonDate, $blockBooking->day);

            foreach ($matchingDates as $matchingDate) {
                $items[] = new CourtCalendarItem(
                    id: $blockBooking->id,
                    uuid: $blockBooking->uuid,
                    model: class_basename($blockBooking),
                    label: $blockBooking->name,
                    reservationDate: $matchingDate,
                    startTime: $blockBooking->start_time,
                    endTime: $blockBooking->end_time,
                    metadata: new BlockBookingCalendarItemMetadata(BlockBookingDaysEnum::from($blockBooking->day))
                );
            }
        }

        return $items;
    }

    /**
     * Get all dates in the month that match the given day of week
     * e.g., for January 2026 and day 1 (Monday), returns ['2026-01-06', '2026-01-13', '2026-01-20', '2026-01-27']
     * 
     * @param Carbon $date
     * @param int $dayOfWeek (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
     * @return array<string>
     */
    private function getDatesForDayOfWeek(Carbon $date, int $dayOfWeek): array
    {
        $startOfMonth = $date->copy()->startOfMonth();
        $endOfMonth = $date->copy()->endOfMonth();
        $dates = [];

        // Find the first occurrence of the day in the month
        $currentDate = $startOfMonth->copy();
        while ($currentDate->dayOfWeek !== $dayOfWeek && $currentDate->lte($endOfMonth)) {
            $currentDate->addDay();
        }

        // Collect all occurrences of this day in the month
        while ($currentDate->lte($endOfMonth)) {
            $dates[] = $currentDate->toDateString();
            $currentDate->addWeek();
        }

        return $dates;
    }
}
