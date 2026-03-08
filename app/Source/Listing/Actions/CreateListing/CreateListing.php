<?php

namespace App\Source\Listing\Actions\CreateListing;

use App\Source\Listing\Actions\CreateListing\Dtos\CreateListingData;
use App\Source\Listing\Models\Listing;

class CreateListing
{
    public function create(CreateListingData $data): Listing
    {
        $listing = new Listing();
        $listing->name = $data->name;
        $listing->city = $data->city;
        $listing->address = $data->address;
        $listing->court_types = $data->courtTypes;
        $listing->number_of_courts = $data->numberOfCourts;
        $listing->email = $data->email;
        $listing->phone = $data->phone;
        $listing->opening_time = $data->openingTime;
        $listing->closing_time = $data->closingTime;
        $listing->google_maps_url = $data->googleMapsUrl;
        $listing->booking_url = $data->bookingUrl;
        $listing->save();

        return $listing;
    }
}
