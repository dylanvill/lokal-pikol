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
        $basePrice = match (true) {
            $startHour >= 6 && $startHour < 9 => 150, // Morning
            $startHour >= 9 && $startHour < 17 => 250, // Day
            $startHour >= 17 && $startHour < 21 => 300, // Evening (peak)
            default => 100, // Night
        };

        return [
            'start_time' => $startTime,
            'end_time' => $endTime,
            'price' => $basePrice,
            'court_id' => Court::factory(),
        ];
    }
}
