<?php

namespace App\Source\Directory\Database\Factories;

use App\Source\Shared\Enums\CityEnum;
use App\Source\Shared\Enums\FacilityCourtTypeEnum;
use App\Source\Directory\Models\Listing;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Source\Directory\Models\Listing>
 */
class ListingFactory extends Factory
{
    protected $model = Listing::class;

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
            'name' => $this->faker->company() . ' Courts',
            'city' => $this->faker->randomElement(CityEnum::values()),
            'address' => $this->faker->address(),
            'court_type' => $this->faker->randomElement(FacilityCourtTypeEnum::values()),
            'number_of_courts' => $this->faker->numberBetween(1, 6),
            'email' => $this->faker->optional(0.8)->companyEmail(),
            'phone' => $this->faker->optional(0.9)->bothify("+639#########"),
            'opening_time' => sprintf('%02d:00:00', $openingHour),
            'closing_time' => sprintf('%02d:00:00', $closingHour),
            'google_maps_url' => $this->faker->optional(0.6)->randomElement(['https://maps.app.goo.gl/CWCR3TM8NUEMW1Bj6']),
            'booking_url' => $this->faker->optional(0.4)->url(),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Listing $listing) {
            $listing
                ->addMediaFromUrl('https://picsum.photos/480/480')
                ->toMediaCollection(MediaTypeEnum::LISTING_PROFILE_PHOTO->value);

            $listing
                ->addMediaFromUrl('https://picsum.photos/1280/720')
                ->toMediaCollection(MediaTypeEnum::LISTING_COVER_PHOTO->value);
        });
    }
}
