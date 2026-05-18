<?php

namespace App\Source\Directory\Actions\RemoveScheduleUrl;

use App\Source\Directory\Models\Listing;

class RemoveScheduleUrl
{
    public function remove(Listing $listing): void
    {
        $listing->scheduleUrl()->delete();
    }
}
