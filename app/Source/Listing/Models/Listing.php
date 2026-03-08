<?php

namespace App\Source\Listing\Models;

use App\Models\Traits\HasUuid;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Shared\Models\SocialLink;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

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
}
