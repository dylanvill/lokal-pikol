<?php

namespace App\Http\Directory\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Directory\Requests\CreateListingRequest;
use App\Source\Directory\Actions\CreateListing\CreateListing;
use App\Source\Directory\Actions\CreateListing\Dtos\CreateListingData;
use App\Source\Directory\Actions\UpdateSocialLink\UpdateSocialLink;
use App\Source\Directory\Models\Listing;
use App\Source\Shared\Enums\SocialLinkEnum;

class CreateListingController extends Controller
{
    public function show()
    {
        return inertia('directory/register');
    }

    public function store(CreateListingRequest $request, CreateListing $service)
    {
        $data = new CreateListingData(
            name: $request->name,
            city: $request->city,
            address: $request->address,
            courtType: $request->courtType,
            numberOfCourts: $request->numberOfCourts,
            profilePhoto: $request->profilePhoto,
            coverPhoto: $request->coverPhoto,
            email: $request->email,
            phone: $request->phone,
            openingTime: $request->openingTime,
            closingTime: $request->closingTime,
            googleMapsUrl: $request->googleMapsUrl,
            bookingUrl: $request->bookingPageUrl,
        );

        $listing = $service->create($data);

        $this->handleSocialLinks($listing, $request);
    }

    protected function handleSocialLinks(Listing $listing, CreateListingRequest $request)
    {
        $links = [
            SocialLinkEnum::FACEBOOK->value => $request->facebookPageUrl,
            SocialLinkEnum::INSTAGRAM->value => $request->instagramUrl
        ];

        foreach ($links as $platform => $link) {
            if (!empty($link)) {
                $service = new UpdateSocialLink($listing);
                $service->update(SocialLinkEnum::from($platform), $link);
            }
        }
    }
}
