<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;

class DeleteListing extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = DirectoryCommandNamespaceEnum::LISTING->value . ':delete {listingId} {--force}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete a listing from the directory';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $listingId = $this->argument('listingId');
        $force = $this->option('force');

        /** @var Listing $listing */
        $listing = Listing::find($listingId);
        $message = "Are you sure you want to delete the listing {$listing->name}?";

        if (!$this->confirm($message)) return;

        $deleteListing = new \App\Source\Directory\Actions\DeleteListing\DeleteListing();
        $deleteListing->delete($listing, $force);
    }
}
