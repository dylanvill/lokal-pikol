<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Actions\RemoveScheduleUrl\RemoveScheduleUrl;
use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use Illuminate\Console\Command;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\select;
use function Laravel\Prompts\spin;

class RemoveScheduleUrlCommand extends Command
{
    public function __construct(protected RemoveScheduleUrl $removeScheduleUrl)
    {
        parent::__construct();
    }

    protected $signature = DirectoryCommandNamespaceEnum::DIRECTORY->value.':remove-schedule-url';

    protected $description = 'Remove the schedule URL from a listing';

    public function handle(): void
    {
        $listings = Listing::has('scheduleUrl')->orderBy('name')->get();

        if ($listings->isEmpty()) {
            $this->error('No listings with a registered schedule URL found.');

            return;
        }

        $listingId = select(
            label: 'Select a listing',
            options: $listings->pluck('name', 'id')->all(),
        );

        $listing = $listings->firstWhere('id', $listingId);
        $listing->load('scheduleUrl');

        $confirmed = confirm(
            label: "Remove schedule URL for \"{$listing->name}\" (provider: {$listing->scheduleUrl->provider->value})?",
            default: false,
        );

        if (! $confirmed) {
            $this->info('Cancelled.');

            return;
        }

        spin(
            callback: fn () => $this->removeScheduleUrl->remove($listing),
            message: 'Removing schedule URL...',
        );

        $this->info("Schedule URL removed from \"{$listing->name}\".");
    }
}
