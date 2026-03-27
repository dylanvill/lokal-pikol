<?php

namespace App\Source\Reservation\Database\Seeders;

use App\Source\Reservation\Enums\ReservationFeeItemsEnum;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Models\ReservationFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reservations = Reservation::all();

        foreach ($reservations as $reservation) {
            // Every reservation gets a hourly rate fee
            ReservationFee::create([
                'item' => ReservationFeeItemsEnum::HOURLY_RATE->value,
                'description' => ReservationFeeItemsEnum::HOURLY_RATE_DESCRIPTION->value,
                'amount' => fake()->randomFloat(2, 60, 120),
                'reservation_id' => $reservation->id,
            ]);

            // 80% chance of service fee
            if (fake()->boolean(80)) {
                ReservationFee::create([
                    'item' => ReservationFeeItemsEnum::SERVICE_FEE->value,
                    'description' => 'Booking and processing service fee',
                    'amount' => fake()->randomFloat(2, 10, 25),
                    'reservation_id' => $reservation->id,
                ]);
            }
        }
    }
}
