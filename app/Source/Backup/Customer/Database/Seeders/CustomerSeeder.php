<?php

namespace App\Source\Customer\Database\Seeders;

use App\Source\Customer\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::factory(30)->create();
    }
}