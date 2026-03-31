<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;

class RestoreListing extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = DirectoryCommandNamespaceEnum::LISTING->value . ':restore {listingId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Restore a listing in the directory';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $listingId = $this->argument('listingId');

        /** @var Listing $listing */
        $listing = Listing::withTrashed()->where('id', $listingId)->first();

        if (empty($listing)) {
            $this->error("Listing with ID {$listingId} not found.");
            return;
        }

        if (!$listing->trashed()) {
            $this->error("Listing with ID {$listingId} is not deleted.");
            return;
        }

        $message = "Are you sure you want to restore the listing {$listing->name}?";

        if (!$this->confirm($message)) return;

        $restoreListing = new \App\Source\Directory\Actions\RestoreListing\RestoreListing();
        $restoreListing->restore($listing);
    }
}
