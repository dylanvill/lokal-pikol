<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Actions\CreateScheduleUrl\CreateScheduleUrl;
use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use Illuminate\Console\Command;

use function Laravel\Prompts\select;
use function Laravel\Prompts\spin;

class RegisterScheduleUrlCommand extends Command
{
    public function __construct(protected CreateScheduleUrl $createScheduleUrl)
    {
        parent::__construct();
    }

    protected $signature = DirectoryCommandNamespaceEnum::DIRECTORY->value.':register-schedule-url';

    protected $description = 'Register a schedule URL for a listing';

    public function handle(): void
    {
        $listings = Listing::orderBy('name')->get();

        if ($listings->isEmpty()) {
            $this->error('No listings found.');

            return;
        }

        $listingId = select(
            label: 'Select a listing',
            options: $listings->pluck('name', 'id')->all(),
        );

        $listing = $listings->firstWhere('id', $listingId);

        if ($listing->scheduleUrl) {
            $this->error("This listing already has a schedule URL registered (provider: {$listing->scheduleUrl->provider->value}).");

            return;
        }

        $provider = ScheduleProviderEnum::from(select(
            label: 'Select a provider',
            options: collect(ScheduleProviderEnum::cases())->pluck('value', 'value')->all(),
        ));

        spin(
            callback: fn () => $this->createScheduleUrl->create($listing, $provider),
            message: 'Registering schedule URL...',
        );

        $this->info("Schedule URL registered for \"{$listing->name}\" with provider \"{$provider->value}\".");
    }
}
