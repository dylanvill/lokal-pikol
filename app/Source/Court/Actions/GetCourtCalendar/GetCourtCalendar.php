<?php

namespace App\Source\Court\Actions\GetCourtCalendar;

use App\Source\Court\Actions\GetCourtCalendar\Dtos\CourtCalendarItem;
use App\Source\Court\Actions\GetCourtCalendar\Dtos\ReservationCalendarItemMetadata;
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
                id: $reservation->uuid,
                uuid: $reservation->uuid,
                model: class_basename($reservation),
                label: $reservation->reservable->reservationNameDisplay(),
                reservationDate: $reservation->reservation_date->toDateString(),
                startTime: $reservation->start_time,
                endTime: $reservation->end_time,
                metadata: new ReservationCalendarItemMetadata(ReservationStatusEnum::from($reservation->status))
            );
        }

        /**
         * I have a
         */

        return $items;
        // return new GetCourtCalendarResult($court);
    }
}
