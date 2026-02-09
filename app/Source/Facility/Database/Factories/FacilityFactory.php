<?php

namespace App\Source\Facility\Database\Factories;

use App\Source\Facility\Enums\CityEnum;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Facility\Models\Facility>
 */
class FacilityFactory extends Factory
{
    protected $model = Facility::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'address' => $this->faker->address(),
            'email' => $this->faker->unique()->companyEmail(),
            'phone' => $this->faker->optional(0.8)->phoneNumber(),
            'google_maps_url' => $this->faker->optional(0.7)->randomElement(['https://maps.app.goo.gl/CWCR3TM8NUEMW1Bj6']),
            'city' => $this->faker->randomElement(CityEnum::cases())->value,
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Facility $facility) {
            $facility
                ->addMediaFromUrl('https://dummyimage.com/1:1x600')
                ->toMediaCollection(MediaTypeEnum::FACILITY_PROFILE_PHOTO->value);
        });
    }
}
