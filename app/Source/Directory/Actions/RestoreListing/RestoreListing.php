<?php

namespace App\Source\Directory\Actions\RestoreListing;

use App\Source\Directory\Models\Listing;

class RestoreListing
{
    public function restore(Listing $listing): Listing|null
    {
        if ($listing->trashed()) {
            $listing->restore();

            return $listing->refresh();
        }

        return null;
    }
}
