<?php

namespace App\Source\Reservation\Database\Factories;

use App\Source\Court\Models\CourtSlot;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Models\ReservationSlot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Reservation\Models\ReservationSlot>
 */
class ReservationSlotFactory extends Factory
{
    protected $model = ReservationSlot::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::factory(),
            'court_slot_id' => CourtSlot::factory(),
        ];
    }
}