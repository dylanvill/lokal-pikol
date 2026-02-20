<?php

namespace App\Source\Reservation\Database\Seeders;

use App\Source\Authentication\Models\User;
use App\Source\Customer\Models\Customer;
use App\Source\Reservation\Actions\CreateReservation\CreateReservation;
use App\Source\Reservation\Actions\CreateReservation\Dtos\CreateReservationData;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = Customer::find(3);

        for ($i = 1; $i < 200; $i++) {
            $service = new CreateReservation();
            $service->create(
                new CreateReservationData(
                    reservable: $user,
                    facilityId: 1,
                    courtId: 1,
                    reservationDate: now()->addDays($i)->toDateString(),
                    startTime: '07:00',
                    endTime: '11:00',
                    status: ReservationStatusEnum::CONFIRMED->value,
                )
            );
        }



        // Reservation::factory(40)->create();
    }
}
