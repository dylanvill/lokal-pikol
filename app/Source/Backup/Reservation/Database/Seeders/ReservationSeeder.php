<?php

namespace App\Source\Reservation\Database\Seeders;

use App\Source\Customer\Models\Customer;
use App\Source\Reservation\Actions\CreateReservation\CreateReservation;
use App\Source\Reservation\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = Customer::find(3);

        $faker = \Faker\Factory::create();

        for ($i = 1; $i < 200; $i++) {
            $service = new CreateReservation();
            $service->create(
                new CreateReservationData(
                    reservable: $user,
                    facilityId: 1,
                    courtId: 1,
                    reservationDate: now()->addDays($i)->toDateString(),
                    startTime: $faker->randomElement(['09:00', '10:00', '11:00']),
                    endTime: $faker->randomElement(['13:00', '14:00', '15:00']),
                    status: ReservationStatusEnum::CONFIRMED->value,
                )
            );
        }



        // Reservation::factory(40)->create();
    }
}
