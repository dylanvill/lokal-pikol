<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Actions\CreateScheduleUrl\CreateScheduleUrl;
use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Configs\CourtAccessProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Configs\LokalPikolProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Configs\PlayKorteProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Configs\ScheduleProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use Illuminate\Console\Command;

use function Laravel\Prompts\select;
use function Laravel\Prompts\spin;
use function Laravel\Prompts\text;

class RegisterScheduleUrlCommand extends Command
{
    public function __construct(protected CreateScheduleUrl $createScheduleUrl)
    {
        parent::__construct();
    }

    protected $signature = DirectoryCommandNamespaceEnum::LISTING->value.':register-schedule-url';

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
            options: collect(ScheduleProviderEnum::cases())
                ->mapWithKeys(fn (ScheduleProviderEnum $case) => [$case->value => $case->getDisplayName()])
                ->all(),
        ));

        $config = $this->buildConfig($provider, $listing);

        spin(
            callback: fn () => $this->createScheduleUrl->create($listing, $config),
            message: 'Registering schedule URL...',
        );

        $this->info("Schedule URL registered for \"{$listing->name}\" with provider \"{$provider->getDisplayName()}\".");
    }

    private function buildConfig(ScheduleProviderEnum $provider, Listing $listing): ScheduleProviderConfig
    {
        if ($provider !== ScheduleProviderEnum::LOKAL_PIKOL) {
            $url = text(
                label: "Enter the {$provider->getDisplayName()} schedule URL for this listing",
                required: true,
            );

            return match ($provider) {
                ScheduleProviderEnum::COURT_ACCESS => new CourtAccessProviderConfig(url: $url),
                ScheduleProviderEnum::PLAYKORTE => new PlayKorteProviderConfig(url: $url),
            };
        }

        return new LokalPikolProviderConfig(listingId: $listing->uuid);
    }
}
