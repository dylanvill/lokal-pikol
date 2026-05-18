<?php

namespace App\Source\Directory\Models\ScheduleUrl;

use App\Source\Directory\Models\ScheduleUrl\Configs\InternalProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Configs\ScheduleProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class ScheduleProviderConfigCast implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): ?ScheduleProviderConfig
    {
        if ($value === null) {
            return null;
        }

        $provider = ScheduleProviderEnum::from($attributes['provider']);
        $data = json_decode($value, true);

        return match ($provider) {
            ScheduleProviderEnum::INTERNAL => InternalProviderConfig::from($data),
        };
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if ($value === null) {
            return null;
        }

        return json_encode($value->toArray());
    }
}
