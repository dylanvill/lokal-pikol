<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

use function Laravel\Prompts\spin;

class PopulateEmptySlugsCommand extends Command
{
    protected $signature = DirectoryCommandNamespaceEnum::LISTING->value.':populate-empty-slugs';

    protected $description = 'Generate slugs for listings that do not have one';

    public function handle(): void
    {
        $listings = Listing::whereNull('slug')->get();

        if ($listings->isEmpty()) {
            $this->info('All listings already have slugs.');

            return;
        }

        spin(
            callback: function () use ($listings) {
                foreach ($listings as $listing) {
                    $listing->slug = $this->generateSlug($listing->name);
                    $listing->save();
                }
            },
            message: "Generating slugs for {$listings->count()} listing(s)..."
        );

        $this->info("Done. Slugs generated for {$listings->count()} listing(s).");
    }

    private function generateSlug(string $name): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $suffix = 2;

        while (Listing::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
