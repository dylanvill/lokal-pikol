<?php

namespace App\Source\Directory\Database\Seeders;

use App\Source\Directory\Models\Listing;
use App\Source\Shared\Enums\SocialLinkEnum;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Listing::factory()->count(50)->create()->each(function (Listing $listing) {
            // Add social links
            $socialLinksData = [
                [
                    'platform' => SocialLinkEnum::FACEBOOK->value,
                    'label' => SocialLinkEnum::FACEBOOK->value,
                    'url' => 'https://www.facebook.com/' . Str::slug($listing->name),
                ],
                [
                    'platform' => SocialLinkEnum::INSTAGRAM->value,
                    'label' => SocialLinkEnum::INSTAGRAM->value,
                    'url' => 'https://www.instagram.com/' . Str::slug($listing->name),
                ],
            ];

            foreach ($socialLinksData as $data) {
                $listing->socialLinks()->create($data);
            }
        });
    }
}
