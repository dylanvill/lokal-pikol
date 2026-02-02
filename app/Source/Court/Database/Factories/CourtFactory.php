<?php

namespace App\Source\Court\Database\Factories;

use App\Source\Client\Models\Client;
use App\Source\Court\Models\Court;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Court\Models\Court>
 */
class CourtFactory extends Factory
{
    protected $model = Court::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Court A', 'Court B', 'Court C']) . ' - ' . $this->faker->city(),
            'covered' => $this->faker->boolean(60), // 60% chance of being covered
            'client_id' => Client::factory(),
        ];
    }
}
