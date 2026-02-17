<?php

namespace Database\Seeders;

use App\Source\Authentication\Models\User;
use App\Source\Facility\Models\Facility;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        // Create 10 facility users with their corresponding facilities
        User::factory()
            ->count(10)
            ->state(['role' => 'facility'])
            ->create()
            ->each(function (User $user) {
                // Create a facility for each facility user
                Facility::factory()
                    ->for($user)
                    ->create();
            });
    }
}
