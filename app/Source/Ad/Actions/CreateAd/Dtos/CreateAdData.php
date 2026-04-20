<?php

namespace App\Source\Ad\Actions\CreateAd\Dtos;

use App\Source\Ad\Enums\CtaLabelEnum;

class CreateAdData
{
    public function __construct(
        public string $title,
        public string $description,
        public string $ctaUrl,
        public CtaLabelEnum $ctaLabel,
        public bool $isActive = true,
    ) {}
}
