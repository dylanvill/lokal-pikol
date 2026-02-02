<?php

namespace App\Source\Reservation\Database\Seeders;

use App\Source\Reservation\Models\ReservationSlot;
use Illuminate\Database\Seeder;

class ReservationSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReservationSlot::factory(60)->create();
    }
}