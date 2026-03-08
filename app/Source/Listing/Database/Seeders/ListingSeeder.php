<?php

namespace App\Source\Listing\Database\Seeders;

use App\Source\Listing\Database\Factories\ListingFactory;
use App\Source\Listing\Models\Listing;
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
