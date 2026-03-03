<?php

namespace App\Source\MediaLibrary\Config;

use Illuminate\Support\Str;
use Spatie\MediaLibrary\Conversions\Conversion;
use Spatie\MediaLibrary\Support\FileNamer\DefaultFileNamer;

class CustomFileNamer extends DefaultFileNamer
{
    public function originalFileName(string $fileName): string
    {
        return Str::remove("-", Str::uuid()->toString());
    }
}
