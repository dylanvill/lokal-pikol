<?php

namespace Database\Seeders;

use App\Source\Authentication\Models\User;
use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtPricing;
use App\Source\Customer\Models\Customer;
use App\Source\Directory\Database\Seeders\ListingSeeder;
use App\Source\Facility\Models\Facility;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->call([
            ListingSeeder::class,
        ]);
    }
}
