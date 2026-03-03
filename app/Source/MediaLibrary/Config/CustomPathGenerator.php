<?php

namespace App\Source\MediaLibrary\Config;

use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\DefaultPathGenerator;

class CustomPathGenerator extends DefaultPathGenerator
{
    protected function getBasePath(Media $media): string
    {
        $prefix = config('media-library.prefix', '');

        $subdir = Str::replace(' ', '-', Str::trim($media->collection_name));

        if ($prefix !== '') {
            return $prefix . '/' . $subdir;
        }

        return $subdir;
    }
}
