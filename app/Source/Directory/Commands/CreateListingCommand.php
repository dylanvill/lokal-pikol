<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Actions\CreateListing\CreateListing;
use App\Source\Directory\Actions\CreateListing\Dtos\CreateListingData;
use App\Source\Directory\Actions\UpdateListingMedia\UpdateListingMedia;
use App\Source\Directory\Actions\UpdateSocialLink\UpdateSocialLink;
use App\Source\Directory\Commands\Enums\DirectoryCommandNamespaceEnum;
use App\Source\Directory\Models\Listing;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Shared\Enums\CityEnum;
use App\Source\Shared\Enums\FacilityCourtTypeEnum;
use App\Source\Shared\Enums\SocialLinkEnum;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\form;
use function Laravel\Prompts\spin;

class CreateListingCommand extends Command
{
    public function __construct(protected CreateListing $createListing)
    {
        parent::__construct();
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = DirectoryCommandNamespaceEnum::LISTING->value . ':create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new listing in the directory';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            DB::beginTransaction();
            $responses = form()
                ->text(label: 'Facility Name', name: 'name', required: true, validate: ['name' => 'string|max:255'])
                ->text(label: 'Number of courts', name: 'numberOfCourts', required: true, validate: ['numberOfCourts' => 'integer|min:1'])
                ->select(label: 'Court Type', name: 'courtType', options: FacilityCourtTypeEnum::values(), required: true)
                ->select(label: 'City', name: 'city', options: CityEnum::values(), required: true)
                ->text(label: 'Address', name: 'address', required: true, validate: ['address' => 'string|max:255'])
                ->text(label: 'Cover Photo URL', name: 'coverPhotoUrl', required: true, validate: ['coverPhotoUrl' => 'url'])
                ->text(label: 'Profile Photo URL', name: 'profilePhotoUrl', required: true, validate: ['profilePhotoUrl' => 'url'])
                ->text(label: 'Booking URL', name: 'bookingUrl', required: false, validate: ['bookingUrl' => 'nullable|url'])
                ->text(label: 'Opening Time:', name: 'openingTime', required: false, validate: ['openingTime' => 'date_format:H:i'])
                ->text(label: 'Closing Time:', name: 'closingTime', required: false, validate: ['closingTime' => 'date_format:H:i'])
                ->text(label: 'Google Maps URL', name: 'googleMapsUrl', required: false, validate: ['googleMapsUrl' => 'nullable|url'])
                ->text(label: 'Email', name: 'email', required: false, validate: ['email' => 'nullable|email'])
                ->text(label: 'Phone Number', name: 'phoneNumber', required: false, validate: ['phoneNumber' => 'nullable|string|digits:10,starts_with:9'])
                ->text(label: 'Facebook URL', name: 'facebookUrl', required: false, validate: ['facebookUrl' => 'nullable|url'])
                ->text(label: 'Instagram URL', name: 'instagramUrl', required: false, validate: ['instagramUrl' => 'nullable|url'])
                ->submit();

            $listing = spin(
                callback: function () use ($responses) {
                    $data = new CreateListingData(
                        name: $responses['name'],
                        city: $responses['city'],
                        address: $responses['address'],
                        courtType: $responses['courtType'],
                        numberOfCourts: $responses['numberOfCourts'],
                        email: $responses['email'],
                        phone: $responses['phoneNumber'],
                        openingTime: $responses['openingTime'],
                        closingTime: $responses['closingTime'],
                        googleMapsUrl: $responses['googleMapsUrl'],
                        bookingUrl: $responses['bookingUrl'],
                    );
                    return $this->createListing($data);
                },
                message: 'Creating listing...'
            );

            spin(
                callback: fn() => $this->handleSocialLinks($listing, $responses),
                message: 'Updating social links...'
            );

            spin(
                callback: function () use ($listing, $responses) {
                    $media = new UpdateListingMedia($listing);
                    $media->setMediaType(MediaTypeEnum::LISTING_COVER_PHOTO)->updateViaUrl($responses['coverPhotoUrl']);
                    $media->setMediaType(MediaTypeEnum::LISTING_PROFILE_PHOTO)->updateViaUrl($responses['profilePhotoUrl']);
                },
                message: 'Updating media...'
            );

            DB::commit();

            $this->info('Listing has been created successfully.');
            $this->info('Name: ' . $listing->name);
            $this->info('Court Type: ' . $listing->court_type);
            $this->info('Number of Courts: ' . $listing->number_of_courts);
            $this->info('City: ' . $listing->city);
            $this->info('Address: ' . $listing->address);
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->error('An error occurred while creating the listing: ' . $th->getMessage());
        }
    }

    protected function handleSocialLinks(Listing $listing, array $responses): void
    {
        $socialLinkService = new UpdateSocialLink($listing);
        if (!empty($responses['facebookUrl'])) {
            $socialLinkService->update(SocialLinkEnum::FACEBOOK, $responses['facebookUrl']);
        }

        if (!empty($responses['instagramUrl'])) {
            $socialLinkService->update(SocialLinkEnum::INSTAGRAM, $responses['instagramUrl']);
        }
    }

    protected function createListing(CreateListingData $data): Listing
    {
        return $this->createListing->create($data);
    }
}
