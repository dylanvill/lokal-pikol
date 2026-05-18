<?php

namespace App\Http\Directory\Resources;

use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleUrlResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'url' => $this->config->resolveUrl($this->listing),
            'isExternal' => $this->provider !== ScheduleProviderEnum::INTERNAL,
            'providerName' => $this->config->displayName(),
        ];
    }
}
