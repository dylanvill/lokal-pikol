<?php

namespace App\Source\Court\Database\Factories;

use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtPricing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Court\Models\CourtPricing>
 */
class CourtPricingFactory extends Factory
{
    protected $model = CourtPricing::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate time slots throughout the day
        $startHour = $this->faker->numberBetween(6, 20);
        $startTime = sprintf('%02d:00:00', $startHour);
        $endTime = sprintf('%02d:00:00', $startHour + 1);

        // Different pricing based on time of day
        $basePrice = match(true) {
            $startHour >= 6 && $startHour < 9 => $this->faker->randomFloat(2, 50, 80), // Morning
            $startHour >= 9 && $startHour < 17 => $this->faker->randomFloat(2, 60, 100), // Day
            $startHour >= 17 && $startHour < 21 => $this->faker->randomFloat(2, 80, 120), // Evening (peak)
            default => $this->faker->randomFloat(2, 40, 70), // Night
        };

        return [
            'start_time' => $startTime,
            'end_time' => $endTime,
            'price' => $basePrice,
            'court_id' => Court::factory(),
        ];
    }

    /**
     * Create pricing for peak hours (higher rates)
     */
    public function peak(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'price' => $this->faker->randomFloat(2, 100, 150),
            ];
        });
    }

    /**
     * Create pricing for off-peak hours (lower rates)
     */
    public function offPeak(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'price' => $this->faker->randomFloat(2, 40, 80),
            ];
        });
    }
}
