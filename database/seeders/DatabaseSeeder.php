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
            ->count(50)
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
                    // Create pricing slots for each court (multiple time slots throughout the day)
                    CourtPricing::factory()
                        ->count(rand(8, 12)) // 8-12 different time slots per court
                        ->for($court)
                        ->create();
                });
        });

        // Create customer users with their corresponding customers
        $customers = User::factory()
            ->count(30)
            ->state(['role' => 'customer'])
            ->create()
            ->map(function (User $user) {
                // Create a customer for each customer user
                return Customer::factory()
                    ->for($user)
                    ->create();
            });

        // Create reservations linking customers to courts/facilities

        // Create reservations linking customers to courts/facilities
        $reservations = $customers->flatMap(function (Customer $customer) use ($courts, $facilities) {
            return collect(range(1, rand(1, 3)))->map(function () use ($customer, $courts, $facilities) {
                $attempts = 0;
                $maxAttempts = 20;

                do {
                    $court = $courts->random();
                    $facility = $facilities->find($court->facility_id);

                    // Generate random date and time
                    $reservationDate = fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d');
                    $startHour = rand(8, 20); // 8 AM to 8 PM
                    $startTime = sprintf('%02d:00:00', $startHour);
                    $endTime = sprintf('%02d:00:00', $startHour + rand(1, 3)); // 1-3 hours duration

                    // Check for conflicts
                    $conflictExists = Reservation::where('court_id', $court->id)
                        ->where('reservation_date', $reservationDate)
                        ->where(function ($query) use ($startTime, $endTime) {
                            $query->whereBetween('start_time', [$startTime, $endTime])
                                ->orWhereBetween('end_time', [$startTime, $endTime])
                                ->orWhere(function ($subQuery) use ($startTime, $endTime) {
                                    $subQuery->where('start_time', '<=', $startTime)
                                        ->where('end_time', '>=', $endTime);
                                });
                        })
                        ->exists();

                    $attempts++;
                } while ($conflictExists && $attempts < $maxAttempts);

                // Skip if couldn't find non-conflicting slot
                if ($conflictExists) {
                    return null;
                }

                return Reservation::factory()
                    ->for($customer)
                    ->for($facility)
                    ->for($court)
                    ->state([
                        'reservation_date' => $reservationDate,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                    ])
                    ->create();
            })->filter(); // Remove null values
        });

        // Create reservation fees for each reservation
        $reservations->each(function (Reservation $reservation) {
            // Create hourly rate fee
            ReservationFee::factory()
                ->for($reservation)
                ->hourlyRate()
                ->create();

            // Create service fee  
            ReservationFee::factory()
                ->for($reservation)
                ->serviceFee()
                ->create();

            // Sometimes add additional fees
            if (rand(1, 3) === 1) {
                ReservationFee::factory()
                    ->for($reservation)
                    ->create();
            }
        });
    }
}
