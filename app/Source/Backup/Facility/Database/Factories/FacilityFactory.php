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
        $openingHour = $this->faker->numberBetween(6, 10);
        $closingHour = $this->faker->numberBetween(20, 23);

        return [
            'name' => $this->faker->company(),
            'address' => $this->faker->address(),
            'email' => $this->faker->unique()->companyEmail(),
            'phone' => "+639{$this->faker->numberBetween(100000000, 999999999)}",
            'description' => $this->faker->optional(0.7)->paragraph(3),
            'opening_time' => sprintf('%02d:00:00', $openingHour),
            'closing_time' => sprintf('%02d:00:00', $closingHour),
            'google_maps_url' => $this->faker->optional(0.7)->randomElement(['https://maps.app.goo.gl/CWCR3TM8NUEMW1Bj6']),
            'city' => $this->faker->randomElement(CityEnum::values()),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Facility $facility) {
            $facility
                ->addMediaFromUrl('https://picsum.photos/300/300')
                ->toMediaCollection(MediaTypeEnum::FACILITY_PROFILE_PHOTO->value);


            $facility
                ->addMediaFromUrl('https://picsum.photos/854/480')
                ->toMediaCollection(MediaTypeEnum::FACILITY_COVER_PHOTO->value);
        });
    }
}
