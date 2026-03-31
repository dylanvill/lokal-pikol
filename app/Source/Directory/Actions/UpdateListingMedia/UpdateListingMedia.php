<?php

namespace App\Source\Directory\Actions\UpdateListingMedia;

use App\Source\Directory\Models\Listing;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UpdateListingMedia
{
    protected MediaTypeEnum $mediaType;

    public function __construct(protected Listing $listing) {}

    public function setMediaType(MediaTypeEnum $mediaType): self
    {
        $this->mediaType = $mediaType;
        return $this;
    }

    public function updateViaUrl(string $url): Media
    {
        return $this->listing->addMediaFromUrl($url)->toMediaCollection($this->mediaType->value);
    }

    public function update(UploadedFile $file): Media
    {
        return $this->listing->addMedia($file)->toMediaCollection($this->mediaType->value);
    }
}
