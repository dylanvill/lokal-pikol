<?php

namespace App\Source\Facility\Database\Seeders;

use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Source\Facility\Models\Facility::factory(10)->create();
    }
}
