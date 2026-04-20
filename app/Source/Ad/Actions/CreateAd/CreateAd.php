<?php

namespace App\Source\Ad\Actions\CreateAd;

use App\Source\Ad\Actions\CreateAd\Dtos\CreateAdData;
use App\Source\Ad\Models\Ad;

class CreateAd
{
    public function create(CreateAdData $data): Ad
    {
        $ad = new Ad();
        $ad->title = $data->title;
        $ad->description = $data->description;
        $ad->cta_url = $data->ctaUrl;
        $ad->cta_label = $data->ctaLabel->value;
        $ad->is_active = $data->isActive;
        $ad->save();

        return $ad;
    }
}
