<?php

namespace App\Source\Directory\Models;

use App\Models\Traits\HasUuid;
use App\Source\Directory\Database\Factories\ListingFactory;
use App\Source\MediaLibrary\Enums\MediaConversionEnum;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Shared\Models\SocialLink;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Listing extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ListingFactory> */
    use HasFactory, HasUuid, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'name',
        'city',
        'address',
        'email',
        'phone',
        'opening_time',
        'closing_time',
        'google_maps_url',
        'booking_url',
    ];

    public function socialLinks(): MorphMany
    {
        return $this->morphMany(SocialLink::class, 'linkable');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(MediaTypeEnum::LISTING_COVER_PHOTO->value)->singleFile();
        $this->addMediaCollection(MediaTypeEnum::LISTING_PROFILE_PHOTO->value)->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion(MediaConversionEnum::COVER_PHOTO_THUMBNAIL->value)
            ->performOnCollections(MediaTypeEnum::LISTING_COVER_PHOTO->value)
            ->width(960)
            ->height(540)
            ->nonQueued();

        $this->addMediaConversion(MediaConversionEnum::PROFILE_PHOTO_THUMBNAIL->value)
            ->performOnCollections(MediaTypeEnum::LISTING_PROFILE_PHOTO->value)
            ->width(480)
            ->height(480)
            ->nonQueued();
    }

    public function updateProfilePhoto($photo): void
    {
        $this->addMedia($photo)
            ->toMediaCollection(MediaTypeEnum::LISTING_PROFILE_PHOTO->value);
    }

    public function updateCoverPhoto($photo): void
    {
        $this->addMedia($photo)
            ->toMediaCollection(MediaTypeEnum::LISTING_COVER_PHOTO->value);
    }

    #[Scope]
    protected function withMedia(Builder $query): void
    {
        $query->with('media');
    }

    public function getCoverPhoto()
    {
        return $this->media()
            ->where('collection_name', MediaTypeEnum::LISTING_COVER_PHOTO->value)
            ->first();
    }

    public function getProfilePhoto()
    {
        return $this->media()
            ->where('collection_name', MediaTypeEnum::LISTING_PROFILE_PHOTO->value)
            ->first();
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return ListingFactory::new();
    }
}
