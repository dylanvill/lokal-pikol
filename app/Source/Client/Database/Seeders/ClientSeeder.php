<?php

namespace App\Source\Client\Database\Seeders;

use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Source\Client\Models\Client::factory(10)->create();
    }
}
