<?php

namespace App\Source\Court\Database\Seeders;

use App\Source\Court\Models\Court;
use Illuminate\Database\Seeder;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Court::factory(20)->create();
    }
}
