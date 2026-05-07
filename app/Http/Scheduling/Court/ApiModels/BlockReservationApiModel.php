<?php

namespace App\Http\Scheduling\Court\ApiModels;

use App\Http\Scheduling\Court\ApiModels\Objects\BlockReservationScheduleApiObject;
use App\Source\Scheduling\Court\Enums\BlockReservationDaysEnum;
use App\Source\Scheduling\Court\Models\BlockReservation;
use App\Source\Scheduling\Court\Shared\Helpers\RangeToCourtSlot;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class BlockReservationApiModel extends Data
{
    private function __construct(
        public string $dayOfTheWeek,
        /** @var array<BlockReservationScheduleApiObject> */
        public array $schedules,
    ) {}

    public static function fromBlockReservation(BlockReservation $blockReservation): self
    {

        $slots = (new RangeToCourtSlot)->convert($blockReservation->start_time, $blockReservation->end_time);
        $slots = collect($slots)->map(function ($slot) use ($blockReservation) {
            $slot->isAvailable = false;
            $slot->label = $blockReservation->name;

            return $slot;
        })->all();

        return new self(
            dayOfTheWeek: ucwords($blockReservation->day_of_the_week),
            schedules: [new BlockReservationScheduleApiObject(
                id: $blockReservation->uuid,
                name: $blockReservation->name,
                slots: $slots,
            )]
        );
    }

    public static function fromManyBlockReservations(Collection $blockReservations): array
    {
        $grouped = $blockReservations->groupBy('day_of_the_week');

        return array_map(function (BlockReservationDaysEnum $day) use ($grouped) {
            $daySchedules = $grouped->get($day->value, collect());

            return new self(
                dayOfTheWeek: ucwords($day->value),
                schedules: $daySchedules->map(function (BlockReservation $reservation) {
                    $slots = collect((new RangeToCourtSlot)->convert($reservation->start_time, $reservation->end_time))
                        ->map(function ($slot) use ($reservation) {
                            $slot->isAvailable = false;
                            $slot->label = $reservation->name;

                            return $slot;
                        })->all();

                    return new BlockReservationScheduleApiObject(
                        id: $reservation->uuid,
                        name: $reservation->name,
                        slots: $slots,
                    );
                })->values()->all(),
            );
        }, BlockReservationDaysEnum::cases());
    }
}
