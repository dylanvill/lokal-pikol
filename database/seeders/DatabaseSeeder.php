<?php

namespace Database\Seeders;

use App\Source\Authentication\Models\User;
use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtPricing;
use App\Source\Customer\Models\Customer;
use App\Source\Facility\Models\Facility;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Models\ReservationFee;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        // Create 10 facility users with their corresponding facilities
        $facilities = User::factory()
            ->count(30)
            ->state(['role' => 'facility'])
            ->create()
            ->map(function (User $user) {
                // Create a facility for each facility user
                return Facility::factory()
                    ->for($user)
                    ->create();
            });

        // Create courts for each facility with pricing
        $courts = $facilities->flatMap(function (Facility $facility) {
            return Court::factory()
                ->count(rand(2, 4)) // 2-4 courts per facility
                ->for($facility)
                ->create()
                ->each(function (Court $court) {
                    // Create the 3 fixed pricing slots for each court
                    // Morning slot: opening time to 11:00
                    CourtPricing::factory()
                        ->morningSlot()
                        ->for($court)
                        ->create();
                    
                    // Day slot: 11:00 to 17:00
                    CourtPricing::factory()
                        ->daySlot()
                        ->for($court)
                        ->create();
                    
                    // Evening slot: 17:00 to closing time
                    CourtPricing::factory()
                        ->eveningSlot()
                        ->for($court)
                        ->create();
                });
        });

        // Create customer users with their corresponding customers
        $customers = User::factory()
            ->count(10)
            ->state(['role' => 'customer'])
            ->create()
            ->map(function (User $user) {
                // Create a customer for each customer user
                return Customer::factory()
                    ->for($user)
                    ->create();
            });
    }
}
