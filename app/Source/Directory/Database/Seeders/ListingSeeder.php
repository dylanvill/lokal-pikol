<?php

namespace App\Source\Directory\Database\Seeders;

use App\Source\Directory\Database\Factories\ListingFactory;
use App\Source\Directory\Models\Listing;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Listing::factory()->count(3)->create();
    }
}
