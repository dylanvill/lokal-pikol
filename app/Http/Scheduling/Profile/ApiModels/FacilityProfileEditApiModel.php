<?php

namespace App\Http\Scheduling\Profile\ApiModels;

use App\Source\Directory\Models\Listing;
use App\Source\MediaLibrary\Enums\MediaConversionEnum;
use App\Source\Shared\Enums\SocialLinkEnum;
use Spatie\LaravelData\Data;

class FacilityProfileEditApiModel extends Data
{
    private function __construct(
        public string $name,
        public ?string $courtType,
        public ?int $numberOfCourts,
        public ?string $email,
        public ?string $phone,
        public ?string $openingTime,
        public ?string $closingTime,
        public ?string $googleMapsUrl,
        public ?string $bookingUrl,
        public ?string $facebookUrl,
        public ?string $instagramUrl,
        public ?string $currentProfilePhotoUrl,
        public ?string $currentCoverPhotoUrl,
    ) {}

    public static function fromListing(Listing $listing): self
    {
        $coverPhoto = $listing->getCoverPhoto();
        $profilePhoto = $listing->getProfilePhoto();

        return new self(
            name: $listing->name,
            courtType: $listing->court_type,
            numberOfCourts: $listing->number_of_courts,
            email: $listing->email,
            phone: self::stripPhonePrefix($listing->phone),
            openingTime: self::formatTime($listing->opening_time),
            closingTime: self::formatTime($listing->closing_time),
            googleMapsUrl: $listing->google_maps_url,
            bookingUrl: $listing->booking_url,
            facebookUrl: self::socialUrlFor($listing, SocialLinkEnum::FACEBOOK),
            instagramUrl: self::socialUrlFor($listing, SocialLinkEnum::INSTAGRAM),
            currentProfilePhotoUrl: $profilePhoto?->getUrl(MediaConversionEnum::PROFILE_PHOTO_THUMBNAIL->value),
            currentCoverPhotoUrl: $coverPhoto?->getUrl(MediaConversionEnum::COVER_PHOTO_THUMBNAIL->value),
        );
    }

    private static function stripPhonePrefix(?string $phone): ?string
    {
        if ($phone === null) {
            return null;
        }

        if (str_starts_with($phone, '+63')) {
            return substr($phone, 3);
        }

        return $phone;
    }

    private static function formatTime(?string $time): ?string
    {
        if ($time === null) {
            return null;
        }

        return substr($time, 0, 5);
    }

    private static function socialUrlFor(Listing $listing, SocialLinkEnum $platform): ?string
    {
        return $listing->socialLinks
            ->firstWhere('platform', $platform->value)
            ?->url;
    }
}
