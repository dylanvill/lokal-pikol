<?php

namespace App\Source\Court\Database\Seeders;

use App\Source\Court\Models\CourtSlot;
use Illuminate\Database\Seeder;

class CourtSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CourtSlot::factory(50)->create();
    }
}