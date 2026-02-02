<?php

namespace App\Source\Reservation\Database\Factories;

use App\Source\Court\Models\Court;
use App\Source\Customer\Models\Customer;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Reservation\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => Customer::factory(),
            'court_id' => Court::factory(),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
        ];
    }
}