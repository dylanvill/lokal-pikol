<?php

namespace App\Source\Authentication\Database\Seeders;

use App\Source\Authentication\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(20)->create();
    }
}
