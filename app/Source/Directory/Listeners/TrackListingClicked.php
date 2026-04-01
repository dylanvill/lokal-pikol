<?php

namespace App\Source\Directory\Listeners;

use App\Source\Analytics\Actions\AddEntry;
use App\Source\Directory\Events\ListingClicked;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class TrackListingClicked implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct(protected AddEntry $service)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ListingClicked $event): void
    {
        $this->service->add($event->data);
    }
}
