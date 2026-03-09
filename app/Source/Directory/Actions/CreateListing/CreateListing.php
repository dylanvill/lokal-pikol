<?php

namespace App\Source\Directory\Actions\CreateListing;

use App\Source\Directory\Actions\CreateListing\Dtos\CreateListingData;
use App\Source\Directory\Models\Listing;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;

class CreateListing
{
    public function create(CreateListingData $data): Listing
    {
        $listing = new Listing();
        $listing->name = $data->name;
        $listing->city = $data->city;
        $listing->address = $data->address;
        $listing->court_type = $data->courtType;
        $listing->number_of_courts = $data->numberOfCourts;
        $listing->email = $data->email;
        $listing->phone = $data->phone;
        $listing->opening_time = $data->openingTime;
        $listing->closing_time = $data->closingTime;
        $listing->google_maps_url = $data->googleMapsUrl;
        $listing->booking_url = $data->bookingUrl;
        $listing->save();

        $listing->updateCoverPhoto($data->coverPhoto);
        $listing->updateProfilePhoto($data->profilePhoto);

        return $listing;
    }
}
