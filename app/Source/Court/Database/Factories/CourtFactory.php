<?php

namespace App\Source\Court\Database\Factories;

use App\Source\Facility\Models\Facility;
use App\Source\Court\Models\Court;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Court\Models\Court>
 */
class CourtFactory extends Factory
{
    protected $model = Court::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Court A', 'Court B', 'Court C']) . ' - ' . $this->faker->city(),
            'covered' => $this->faker->boolean(60), // 60% chance of being covered
            'facility_id' => Facility::factory(),
        ];
    }


    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Court $court) {
            collect(range(1, 4))->each(function () use ($court) {
                $court
                    ->addMediaFromUrl('https://picsum.photos/400/400')
                    ->toMediaCollection(MediaTypeEnum::COURT_PHOTOS->value);
            });
        });
    }
}
