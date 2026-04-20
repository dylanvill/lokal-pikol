<?php

namespace App\Http\Directory\Resources;

use App\Source\MediaLibrary\Enums\MediaConversionEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $photo = $this->getAdImage();

        return [
            'id' => $this->uuid,
            'title' => $this->title,
            'description' => $this->description,
            'redirectUrl' => $this->cta_url,
            'ctaLabel' => $this->cta_label,
            'photo' => empty($photo) ? null : [
                'uuid' => $photo->uuid,
                'url' => $photo->getUrl(MediaConversionEnum::SQUARE_IMAGE->value),
            ],
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
