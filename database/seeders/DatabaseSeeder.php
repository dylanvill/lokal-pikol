<?php

namespace Database\Seeders;

use App\Source\Directory\Database\Seeders\ListingSeeder;
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
