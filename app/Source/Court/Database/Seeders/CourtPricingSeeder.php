<?php

namespace App\Source\Court\Database\Seeders;

use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtPricing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourtPricingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all courts and create pricing for each
        $courts = Court::all();

        foreach ($courts as $court) {
            // Create hourly pricing from 6 AM to 11 PM
            for ($hour = 6; $hour <= 22; $hour++) {
                $startTime = sprintf('%02d:00:00', $hour);
                $endTime = sprintf('%02d:00:00', $hour + 1);

                // Different pricing based on time of day
                $price = match(true) {
                    $hour >= 6 && $hour < 9 => fake()->randomFloat(2, 50, 80), // Morning
                    $hour >= 9 && $hour < 17 => fake()->randomFloat(2, 60, 100), // Day
                    $hour >= 17 && $hour < 21 => fake()->randomFloat(2, 80, 120), // Evening (peak)
                    default => fake()->randomFloat(2, 40, 70), // Night
                };

                CourtPricing::create([
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'price' => $price,
                    'court_id' => $court->id,
                ]);
            }
        }
    }
}
