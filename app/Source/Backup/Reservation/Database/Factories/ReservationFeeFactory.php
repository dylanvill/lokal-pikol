<?php

namespace App\Source\Reservation\Database\Factories;

use App\Source\Reservation\Enums\ReservationFeeItemsEnum;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Models\ReservationFee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Reservation\Models\ReservationFee>
 */
class ReservationFeeFactory extends Factory
{
    protected $model = ReservationFee::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $feeTypes = [
            [
                'item' => ReservationFeeItemsEnum::HOURLY_RATE->value,
                'description' => ReservationFeeItemsEnum::HOURLY_RATE_DESCRIPTION->value,
                'amount' => $this->faker->randomFloat(2, 50, 150)
            ],
            [
                'item' => ReservationFeeItemsEnum::SERVICE_FEE->value,
                'description' => null,
                'amount' => $this->faker->randomFloat(2, 8, 25)
            ],
        ];

        $selectedFee = $this->faker->randomElement($feeTypes);

        return [
            'item' => $selectedFee['item'],
            'description' => $selectedFee['description'],
            'amount' => $selectedFee['amount'],
            'reservation_id' => Reservation::factory(),
        ];
    }

    /**
     * Create a hourly rate fee
     */
    public function hourlyRate(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'item' => ReservationFeeItemsEnum::HOURLY_RATE->value,
                'description' => ReservationFeeItemsEnum::HOURLY_RATE_DESCRIPTION->value,
                'amount' => $this->faker->randomFloat(2, 60, 120),
            ];
        });
    }

    /**
     * Create a service fee
     */
    public function serviceFee(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'item' => ReservationFeeItemsEnum::SERVICE_FEE->value,
                'description' => 'Booking and processing service fee',
                'amount' => $this->faker->randomFloat(2, 10, 25),
            ];
        });
    }
}
