<?php

namespace App\Source\Reservation\Database\Factories;

use App\Source\Court\Models\Court;
use App\Source\Customer\Models\Customer;
use App\Source\Facility\Models\Facility;
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
        $startTime = $this->faker->time('H:i:s', '22:00:00');
        $endTime = $this->faker->time('H:i:s', '23:00:00');
        
        return [
            'customer_id' => Customer::factory(),
            'facility_id' => Facility::factory(),
            'court_id' => Court::factory(),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
            'reservation_date' => $this->faker->date(),
            'start_time' => $startTime,
            'end_time' => $endTime,
        ];
    }
}