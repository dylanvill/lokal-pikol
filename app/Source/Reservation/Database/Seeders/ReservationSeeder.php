<?php

namespace App\Source\Reservation\Database\Seeders;

use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Reservation::factory(40)->create();
    }
}