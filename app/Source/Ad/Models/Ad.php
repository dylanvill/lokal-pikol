<?php

namespace App\Source\Ad\Models;

use App\Source\MediaLibrary\Enums\MediaConversionEnum;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property int $id
 * @property string $uuid
 * @property string $title
 * @property string $description
 * @property string $cta_url
 * @property string $cta_label
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * 
 * @method Media getAdImage()
 * @method Ad|null getActiveAd()
 */
class Ad extends Model implements HasMedia
{
    use HasUuid, InteractsWithMedia;

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(MediaTypeEnum::AD_IMAGE->value)->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion(MediaConversionEnum::SQUARE_IMAGE->value)
            ->performOnCollections(MediaTypeEnum::AD_IMAGE->value)
            ->width(1024)
            ->height(1024)
            ->nonQueued();
    }

    public function getAdImage(): Media|null
    {
        return $this->getFirstMedia(MediaTypeEnum::AD_IMAGE->value);
    }

    public static function getActiveAd(): Ad|null {
        $instance = new static;

        return $instance->newQuery()->where('is_active', true)->first();
    }
}
