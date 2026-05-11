<?php

namespace App\Source\Directory\Actions\UpdateListing;

use App\Source\Directory\Actions\UpdateListing\Dtos\UpdateListingData;
use App\Source\Directory\Models\Listing;

class UpdateListing
{
    public function update(Listing $listing, UpdateListingData $data): Listing
    {
        $attributes = $data->toListingAttributes();

        if (! empty($attributes)) {
            $listing->fill($attributes);
            $listing->save();
        }

        return $listing;
    }
}
