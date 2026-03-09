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
        $coverPhoto = $this->uploadedFileFromUrl('https://images.unsplash.com/photo-1686721134997-a43d7de8de1a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        $profilePhoto = $this->uploadedFileFromUrl('https://i.fbcd.co/products/resized/resized-750-500/pickleball8-8c7cf5b89f8a4a318b20b7251dafc670677edca074501af5c4b1e1932b1ae17b.jpg');
        $name = 'Lakeside Community Courts';

        $data = new CreateListingData(
            name: $name,
            city: CityEnum::TANJAY->value,
            address: '321 Lakeside Boulevard, Tanjay City, Negros Oriental',
            courtType: 'Outdoor',
            numberOfCourts: 3,
            profilePhoto: $profilePhoto,
            coverPhoto: $coverPhoto,
            email: 'hello@lakesidecourts.com',
            phone: '+639198765432',
            openingTime: '07:00',
            closingTime: '20:00',
            googleMapsUrl: 'https://maps.google.com/?q=Lakeside+Community+Courts+Tanjay',
            bookingUrl: 'https://lakesidecourts.com/reserve',
        );

        $service = new CreateListing();

        $listing = $service->create($data);

        $links = [
            ['type' => SocialLinkEnum::FACEBOOK, 'url' => 'https://www.facebook.com/lokalpikoldirectory'],
            ['type' => SocialLinkEnum::INSTAGRAM, 'url' => 'https://www.instagram.com/lokalpikoldirectory/'],
        ];

        $linkService = new UpdateSocialLink($listing);
        foreach ($links as $link) {
            $linkService->update($link['type'], $link['url']);
        }
    }

    public function uploadedFileFromUrl(string $url): UploadedFile
    {
        $response = Http::get($url);

        if (! $response->successful()) {
            throw new Exception('Failed to download file.');
        }

        $tempPath = storage_path('app/temp_' . Str::random(10));

        file_put_contents($tempPath, $response->body());

        return new UploadedFile(
            $tempPath,
            basename(parse_url($url, PHP_URL_PATH)),
            mime_content_type($tempPath),
            null,
            true // mark as test so Laravel won't check HTTP upload
        );
    }
}
