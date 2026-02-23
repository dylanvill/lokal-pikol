<?php

namespace App\Source\Court\Actions\GetCourtBlockBookingSchedules;

use App\Source\Court\Models\Court;
use App\Source\Court\Models\BlockBooking;
use App\Source\Court\Actions\GetCourtBlockBookingSchedules\Dtos\BlockBookingSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\RangeToSlot;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use App\Source\Court\Enums\BlockBookingDaysEnum;

class GetCourtBlockBookingSchedules
{
    /**
     * @param Court $court
     * @param BlockBookingDaysEnum $dayOfTheWeek
     * @return BlockBookingSlot[]
     */
    public function get(Court $court, BlockBookingDaysEnum $dayOfTheWeek): array
    {
        $court = $court->load([
            'courtPricings',
            'blockBookings' => function ($query) use ($dayOfTheWeek) {
                $query->where('day', $dayOfTheWeek->value);
            },
        ]);

        $ranges = $court->courtPricings->map(fn($pricing) => new Range(startTime: $pricing->start_time, endTime: $pricing->end_time, price: (float) $pricing->price))->all();

        $slots = RangeToSlot::convertMany($ranges);
        $blockedSlots = $this->getBlockBookingSlots($court->blockBookings);

        $bookingSlots = [];

        foreach ($slots as $slot) {
            $blockingName = $this->getBlockingName($slot, $blockedSlots);

            $bookingSlots[] = new BlockBookingSlot(
                name: $blockingName ?? 'Available',
                startTime: $slot->startTime,
                endTime: $slot->endTime,
                price: $slot->price,
                isAvailable: is_null($blockingName)
            );
        }

        return $bookingSlots;
    }

    /**
     * Get the name of the block booking that conflicts with this slot
     * @param CourtSlot $slot
     * @param Collection<BlockBookingSlot> $slotsHaystack
     * @return string|null
     */
    protected function getBlockingName(CourtSlot $slot, Collection $slotsHaystack): ?string
    {
        $conflict = $slotsHaystack->first(
            fn($slotHaystack) => Carbon::parse($slotHaystack->startTime)->format('H:i') === Carbon::parse($slot->startTime)->format('H:i')
                && Carbon::parse($slotHaystack->endTime)->format('H:i') === Carbon::parse($slot->endTime)->format('H:i')
        );

        return $conflict?->name;
    }

    /**
     * @param Collection<BlockBooking> $blockBookings
     * @return Collection<BlockBookingSlot>
     */
    protected function getBlockBookingSlots(Collection $blockBookings): Collection
    {
        $blockingSlots = [];

        foreach ($blockBookings as $blockBooking) {
            $ranges = [new Range(
                startTime: $blockBooking->start_time,
                endTime: $blockBooking->end_time
            )];

            $slots = RangeToSlot::convertMany($ranges);

            foreach ($slots as $slot) {
                $blockingSlots[] = new BlockBookingSlot(
                    name: $blockBooking->dayName . ' - ' . $blockBooking->name ?? 'Block Booking',
                    startTime: $slot->startTime,
                    endTime: $slot->endTime,
                    price: $slot->price,
                    isAvailable: false
                );
            }
        }

        return collect($blockingSlots);
    }
}
