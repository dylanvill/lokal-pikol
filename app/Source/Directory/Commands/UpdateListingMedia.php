<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Facades\DB;
use function Laravel\Prompts\form;
use function Laravel\Prompts\info;
use function Laravel\Prompts\confirm;

class UpdateListingMedia extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = DirectoryCommandNamespaceEnum::LISTING->value . ':update-media';

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
        $responses = form()
            ->text(
                label: 'Facility ID',
                required: true,
                name: 'listingId',
                validate: ['listingId' => 'exists:listings,id'],
            )
            ->select(
                label: 'Media Type',
                required: true,
                name: 'mediaType',
                options: [
                    MediaTypeEnum::LISTING_COVER_PHOTO->value,
                    MediaTypeEnum::LISTING_PROFILE_PHOTO->value
                ],
            )
            ->text(
                label: 'Media URL',
                required: true,
                name: 'url',
                validate: ['url' => 'url'],
            )
            ->submit();

        /** @var Listing */
        $listing = Listing::find($responses['listingId']);
        $type = MediaTypeEnum::tryFrom($responses['mediaType']);

        $confirmed = confirm("Are you sure you want to update the {$responses['mediaType']} for listing {$listing->name} with URL: {$responses['url']}?");

        if (!$confirmed) return;

        try {
            DB::beginTransaction();
            $listing->addMediaFromUrl($responses['url'])
                ->toMediaCollection($type->value);
            info("Successfully updated media for listing {$listing->name}");
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            info("Failed to update media: {$th->getMessage()}");
        }
    }
}
