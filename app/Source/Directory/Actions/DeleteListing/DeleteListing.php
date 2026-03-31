<?php

namespace App\Source\Directory\Actions\DeleteListing;

use App\Source\Directory\Models\Listing;

class DeleteListing
{
    public function delete(Listing $listing, bool $force = false): void
    {
        if ($force) {
            $listing->forceDelete();
        } else {
            $listing->delete();
        }
    }
}
