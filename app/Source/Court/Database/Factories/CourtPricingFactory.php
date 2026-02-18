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
        // This is a placeholder definition - actual pricing slots are created using states
        return [
            'start_time' => '06:00:00',
            'end_time' => '07:00:00',
            'price' => 150,
            'court_id' => Court::factory(),
        ];
    }

    /**
     * Create morning pricing slot (opening time to 11:00)
     */
    public function morningSlot(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'start_time' => '06:00:00', // Will be set properly when used with ->for($court)
                'end_time' => '11:00:00',
                'price' => 150, // Morning pricing
            ];
        });
    }

    /**
     * Create day pricing slot (11:00 to 17:00)
     */
    public function daySlot(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'start_time' => '11:00:00',
                'end_time' => '17:00:00',
                'price' => 250, // Day pricing
            ];
        });
    }

    /**
     * Create evening pricing slot (17:00 to closing time)
     */
    public function eveningSlot(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'start_time' => '17:00:00',
                'end_time' => '22:00:00', // Will be set properly when used with ->for($court)
                'price' => 300, // Evening pricing (peak)
            ];
        });
    }
}