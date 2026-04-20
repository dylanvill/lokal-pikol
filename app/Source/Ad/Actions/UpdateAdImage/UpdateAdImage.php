<?php

namespace App\Source\Ad\Actions\UpdateAdImage;

use App\Source\Ad\Models\Ad;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UpdateAdImage
{
    public function __construct(protected Ad $ad) {}

    public function updateViaUrl(string $url): Media
    {
        return $this->ad->addMediaFromUrl($url)->toMediaCollection(MediaTypeEnum::AD_IMAGE->value);
    }

    public function update(UploadedFile $file): Media
    {
        return $this->ad->addMedia($file)->toMediaCollection(MediaTypeEnum::AD_IMAGE->value);
    }
}
