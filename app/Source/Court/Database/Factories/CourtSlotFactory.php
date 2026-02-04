<?php

namespace App\Source\Court\Database\Factories;

use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtSlot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Court\Models\CourtSlot>
 */
class CourtSlotFactory extends Factory
{
    protected $model = CourtSlot::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'time' => $this->faker->time('H:i:s'),
            'rate' => $this->faker->randomElement([150, 200, 250, 300, 500]),
            'court_id' => Court::factory(),
        ];
    }
}
