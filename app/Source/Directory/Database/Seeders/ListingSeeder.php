<?php

namespace App\Source\Directory\Database\Seeders;

use App\Source\Directory\Actions\CreateListing\CreateListing;
use App\Source\Directory\Actions\CreateListing\Dtos\CreateListingData;
use App\Source\Directory\Actions\UpdateSocialLink\UpdateSocialLink;
use App\Source\Directory\Database\Factories\ListingFactory;
use App\Source\Directory\Models\Listing;
use App\Source\Facility\Enums\CityEnum;
use App\Source\Shared\Enums\SocialLinkEnum;
use App\Source\Shared\Models\SocialLink;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Listing::factory()->count(20)->create()->each(function (Listing $listing) {
            // Add social links
            $socialLinksData = [
                [
                    'type' => SocialLinkEnum::FACEBOOK->value,
                    'url' => 'https://www.facebook.com/' . Str::slug($listing->name),
                ],
                [
                    'type' => SocialLinkEnum::INSTAGRAM->value,
                    'url' => 'https://www.instagram.com/' . Str::slug($listing->name),
                ],
            ];

            foreach ($socialLinksData as $data) {
                $listing->socialLinks()->create($data);
            }
        });
    }
}
