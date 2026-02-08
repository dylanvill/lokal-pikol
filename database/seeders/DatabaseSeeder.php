<?php

namespace Database\Seeders;

use App\Source\Authentication\Models\User;
use App\Source\Client\Enums\CityEnum;
use App\Source\Client\Models\Client;
use App\Source\Customer\Models\Customer;
use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtSlot;
use App\Source\Reservation\Models\Reservation;
use App\Source\Reservation\Models\ReservationSlot;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->full();
    }

    public function bak(): void
    {
        // Create Client Users and their profiles
        $clientUsers = collect();
        for ($i = 1; $i <= 5; $i++) {
            $clientUser = User::create([
                'email' => "client{$i}@example.com",
                'password' => bcrypt('password'),
                'role' => 'client'
            ]);

            $client = Client::create([
                'uuid' => Str::uuid(),
                'user_id' => $clientUser->id,
                'name' => "Court Business {$i}",
                'address' => fake()->address(),
                'email' => $clientUser->email,
                'phone' => fake()->phoneNumber(),
                'google_maps_url' => fake()->optional(0.7)->randomElement(['https://maps.app.goo.gl/CWCR3TM8NUEMW1Bj6']),
                'city' => fake()->randomElement(CityEnum::cases())->value,
            ]);

            // Add client profile photo and cover photo
            try {
                $client->addMediaFromUrl('https://picsum.photos/600/600')
                    ->toMediaCollection('client profile photo');

                $client->addMediaFromUrl('https://picsum.photos/1200/400')
                    ->toMediaCollection('client cover photo');
            } catch (\Exception $e) {
                $this->command->warn("Failed to download images for client {$i}: " . $e->getMessage());
            }

            $clientUsers->push($clientUser);
        }

        // Create Customer Users and their profiles
        $customerUsers = collect();
        for ($i = 1; $i <= 15; $i++) {
            $customerUser = User::create([
                'email' => "customer{$i}@example.com",
                'password' => bcrypt('password'),
                'role' => 'customer'
            ]);

            Customer::create([
                'uuid' => Str::uuid(),
                'user_id' => $customerUser->id,
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'email' => $customerUser->email,
            ]);

            $customerUsers->push($customerUser);
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info("Created {$clientUsers->count()} client users with business profiles");
        $this->command->info("Created {$customerUsers->count()} customer users");
    }

    private function full(): void
    {
        // Create Client Users and their profiles
        $clientUsers = collect();
        for ($i = 1; $i <= 5; $i++) {
            $clientUser = User::create([
                'email' => "client{$i}@example.com",
                'password' => bcrypt('password'),
                'role' => 'client'
            ]);

            $client = Client::create([
                'uuid' => Str::uuid(),
                'user_id' => $clientUser->id,
                'name' => "Court Business {$i}",
                'address' => fake()->address(),
                'email' => $clientUser->email,
                'phone' => fake()->phoneNumber(),
                'google_maps_url' => fake()->optional(0.7)->randomElement(['https://maps.app.goo.gl/CWCR3TM8NUEMW1Bj6']),
                'city' => fake()->randomElement(CityEnum::cases())->value,
            ]);

            // Add client profile photo and cover photo
            try {
                $client->addMediaFromUrl('https://picsum.photos/600/600')
                    ->toMediaCollection('client profile photo');

                $client->addMediaFromUrl('https://picsum.photos/1200/400')
                    ->toMediaCollection('client cover photo');
            } catch (\Exception $e) {
                $this->command->warn("Failed to download images for client {$i}: " . $e->getMessage());
            }

            $clientUsers->push($clientUser);
        }

        // Create Customer Users and their profiles
        $customerUsers = collect();
        for ($i = 1; $i <= 15; $i++) {
            $customerUser = User::create([
                'email' => "customer{$i}@example.com",
                'password' => bcrypt('password'),
                'role' => 'customer'
            ]);

            Customer::create([
                'uuid' => Str::uuid(),
                'user_id' => $customerUser->id,
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'email' => $customerUser->email,
            ]);

            $customerUsers->push($customerUser);
        }

        // Create Courts for each Client
        $courts = collect();
        foreach ($clientUsers as $clientUser) {
            $client = $clientUser->client;
            $courtCount = rand(2, 4); // Each client has 2-4 courts

            for ($j = 1; $j <= $courtCount; $j++) {
                $court = Court::create([
                    'uuid' => Str::uuid(),
                    'name' => "Court {$j}",
                    'covered' => fake()->boolean(60), // 60% chance of being covered
                    'client_id' => $client->id,
                ]);

                $courts->push($court);

                // Add 3-6 court photos
                $photoCount = rand(3, 6);
                for ($p = 1; $p <= $photoCount; $p++) {
                    try {
                        $court->addMediaFromUrl('https://picsum.photos/800/600')
                            ->toMediaCollection('court photos');
                    } catch (\Exception $e) {
                        $this->command->warn("Failed to download court photo {$p} for court {$j}: " . $e->getMessage());
                    }
                }

                // Create Court Slots for each Court (hourly slots from 8 AM to 10 PM)
                for ($hour = 8; $hour <= 22; $hour++) {
                    CourtSlot::create([
                        'uuid' => Str::uuid(),
                        'time' => sprintf('%02d:00:00', $hour),
                        'rate' => fake()->randomElement([150, 200, 250, 300, 500]),
                        'court_id' => $court->id,
                    ]);
                }
            }
        }

        // Create Reservations
        $reservations = collect();
        foreach ($customerUsers as $customerUser) {
            $customer = $customerUser->customer;
            $reservationCount = rand(1, 3); // Each customer has 1-3 reservations

            for ($k = 0; $k < $reservationCount; $k++) {
                $randomCourt = $courts->random();

                $reservation = Reservation::create([
                    'uuid' => Str::uuid(),
                    'customer_id' => $customer->id,
                    'court_id' => $randomCourt->id,
                    'reservation_date' => fake()->dateTimeBetween('now', '+30 days'),
                    'status' => fake()->randomElement(['pending', 'confirmed', 'completed', 'cancelled']),
                ]);

                $reservations->push($reservation);

                // Create Reservation Slots (1-3 consecutive slots per reservation)
                $availableSlots = $randomCourt->courtSlots;
                $slotCount = rand(1, 3);
                $randomSlots = $availableSlots->random($slotCount);

                foreach ($randomSlots as $slot) {
                    ReservationSlot::create([
                        'uuid' => Str::uuid(),
                        'reservation_id' => $reservation->id,
                        'court_slot_id' => $slot->id,
                    ]);
                }
            }
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info("Created {$clientUsers->count()} clients with {$courts->count()} courts");
        $this->command->info("Created {$customerUsers->count()} customers with {$reservations->count()} reservations");
    }
}
