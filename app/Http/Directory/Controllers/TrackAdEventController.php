<?php

namespace App\Http\Directory\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Source\Ad\Actions\TrackAdAnalytics\Dtos\TrackAdAnalyticsData;
use App\Source\Ad\Models\Ad;
use App\Source\Analytics\Actions\AddEntry;
use App\Source\Directory\Actions\TrackListingAnalytics\TrackListingAnalytics;
use App\Source\Directory\Enums\ListingEventEnum;
use App\Source\Directory\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackAdEventController extends Controller
{
    public function __invoke(Ad $ad, AddEntry $service)
    {
        $service->add(new TrackAdAnalyticsData($ad));

        return redirect()->back();
    }
}
