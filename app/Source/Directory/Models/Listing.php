<?php

namespace App\Source\Directory\Models;

use App\Source\Directory\Database\Factories\ListingFactory;
use App\Source\Directory\Models\ScheduleUrl\ScheduleUrl;
use App\Source\MediaLibrary\Enums\MediaConversionEnum;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use App\Source\Shared\Models\HasUuid;
use App\Source\Shared\Models\SocialLink;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property int $id
 * @property string $uuid
 * @property string|null $slug
 * @property string $name
 * @property string $city
 * @property string $address
 * @property string $court_type
 * @property int $number_of_courts
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $opening_time
 * @property string|null $closing_time
 * @property string|null $google_maps_url
 * @property string|null $booking_url
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read ScheduleUrl|null $scheduleUrl
 * @property-read \Illuminate\Database\Eloquent\Collection<int, FacilityAdmin> $facilityAdmins
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Source\Scheduling\Court\Models\Court> $courts
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Source\Scheduling\Court\Models\BlockReservation> $blockReservations
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Source\Shared\Models\SocialLink> $socialLinks
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\MediaLibrary\MediaCollections\Models\Media> $media
 */
class Listing extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ListingFactory> */
    use HasFactory, HasUuid, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'uuid',
        'name',
        'city',
        'address',
        'court_type',
        'number_of_courts',
        'email',
        'phone',
        'opening_time',
        'closing_time',
        'google_maps_url',
        'booking_url',
    ];

    public function scheduleUrl(): HasOne
    {
        return $this->hasOne(ScheduleUrl::class);
    }

    public function facilityAdmins(): HasMany
    {
        return $this->hasMany(FacilityAdmin::class);
    }

    public function courts(): HasMany
    {
        return $this->hasMany(\App\Source\Scheduling\Court\Models\Court::class);
    }

    public function blockReservations(): HasMany
    {
        return $this->hasMany(\App\Source\Scheduling\Court\Models\BlockReservation::class);
    }

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
            ->width(1280)
            ->height(720)
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
