<?php

namespace App\Source\Scheduling\Court\Actions\GenerateSlots;

use App\Source\Scheduling\Court\Actions\GenerateSlots\Resolvers\BlockReservationConflictResolver;
use App\Source\Scheduling\Court\Actions\GenerateSlots\Resolvers\ReservationConflictResolver;
use App\Source\Scheduling\Court\Actions\GenerateSlots\Resolvers\BaseSlotConflictResolver;
use App\Source\Scheduling\Court\Models\Court;
use App\Source\Scheduling\Court\Shared\Dtos\CourtSlot;

class GenerateCourtSlotsWithAvailability
{
    /** @var array<BaseSlotConflictResolver> */
    private array $resolvers;

    public function __construct(
        private GenerateSlots $generateSlots,
        ReservationConflictResolver $reservationResolver,
        BlockReservationConflictResolver $blockReservationResolver,
    ) {
        $this->resolvers = [$reservationResolver, $blockReservationResolver];
    }

    /**
     * Generates hourly slots for a court on a given date, marking each slot
     * as unavailable when it conflicts with a reservation or recurring block.
     *
     * @return array<CourtSlot>
     */
    public function generate(string $startTime, string $endTime, string $date, Court $court): array
    {
        $slots = $this->generateSlots->generate($startTime, $endTime);

        foreach ($this->resolvers as $resolver) {
            $slots = $resolver->resolveConflicts($slots, $court, $date);
        }

        return $slots;
    }
}
