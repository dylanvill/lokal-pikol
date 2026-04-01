<?php

namespace App\Http\Directory\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Source\Directory\Actions\TrackListingAnalytics\TrackListingAnalytics;
use App\Source\Directory\Enums\ListingEventEnum;
use App\Source\Directory\Models\Listing;
use Inertia\Inertia;

class TrackListingEventController extends Controller
{
    protected array $mapping = [
        'facebook' => ListingEventEnum::FACEBOOK_CLICKED,
        'instagram' => ListingEventEnum::INSTAGRAM_CLICKED,
        'book' => ListingEventEnum::BOOK_COURT_CLICKED,
    ];

    public function __construct(protected TrackListingAnalytics $service) {}

    public function __invoke(Listing $listing, string $event)
    {
        if (isset($this->mapping[$event])) {
            $this->service->track($listing, $this->mapping[$event]);
        }

        return redirect()->back();
    }
}
