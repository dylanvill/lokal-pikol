<?php

namespace App\Source\Court\Actions\GetCourtAvailability;

use App\Source\Court\Models\Court;
use App\Source\Court\Models\BlockBooking;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\RangeToSlot;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class GetCourtAvailability
{
    /**
     * @param Court $court
     * @param string $date
     * @return CourtSlot[]
     */
    public function get(Court $court, string $date): array
    {
        $dayOfTheWeek = Carbon::createFromFormat('Y-m-d', $date)->dayOfWeek();

        $court = $court->load([
            'reservations' => function ($query) use ($date) {
                $query->whereDate('reservation_date', $date)
                    ->whereNot('status', ReservationStatusEnum::CANCELLED->value);
            },
            'courtPricings',
            'blockBookings' => function ($query) use ($dayOfTheWeek) {
                $query->where('day', $dayOfTheWeek);
            },
        ]);

        $ranges = $court->courtPricings->map(fn($pricing) => new Range(startTime: $pricing->start_time, endTime: $pricing->end_time, price: (float) $pricing->price))->all();

        $slots = RangeToSlot::convertMany($ranges);
        $reservationSlots = $this->getReservationSlots($court->reservations);
        $blockedSlots = $this->getBlockBookingSlots($court->blockBookings);


        foreach ($slots as $slot) {
            // Check if reserved first, if reserved then no need to check if blocked
            $slot->isAvailable = $this->isAvailable($slot, $reservationSlots);
            if (!$slot->isAvailable) continue;

            $slot->isAvailable = $this->isAvailable($slot, $blockedSlots);
        }

        return $slots;
    }

    /**
     * @param CourtSlot $slot
     * @param Collection<CourtSlot> $slotsHaystack
     * @return boolean
     */
    protected function isAvailable(CourtSlot $slot, Collection $slotsHaystack): bool
    {
        $isAvailable = $slotsHaystack->first(
            fn($slotHaystack) => $slotHaystack->startTime === $slot->startTime
                && $slotHaystack->endTime === $slot->endTime
        );
        $isAvailable = empty($isAvailable);

        return $isAvailable;
    }

    /**
     * @param Collection<Reservation> $reservations
     * @return Collection<CourtSlot>
     */
    protected function getReservationSlots(Collection $reservations): Collection
    {
        $ranges = $reservations->map(fn($reservation) => new Range(
            startTime: $reservation->start_time,
            endTime: $reservation->end_time
        ))->all();

        $ranges = RangeToSlot::convertMany($ranges);

        return collect($ranges);
    }

    /**
     * @param Collection<BlockBooking> $blockBookings
     * @return Collection<CourtSlot>
     */
    protected function getBlockBookingSlots(Collection $blockBookings): Collection
    {
        $ranges = $blockBookings->map(fn($blockBooking) => new Range(
            startTime: $blockBooking->start_time,
            endTime: $blockBooking->end_time
        ))->all();

        $ranges = RangeToSlot::convertMany($ranges);

        return collect($ranges);
    }
}
