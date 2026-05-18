<?php

namespace App\Source\Directory\Models\ScheduleUrl;

use App\Source\Directory\Models\Listing;
use App\Source\Directory\Models\ScheduleUrl\Configs\ScheduleProviderConfig;
use App\Source\Directory\Models\ScheduleUrl\Enums\ScheduleProviderEnum;
use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $uuid
 * @property int $listing_id
 * @property ScheduleProviderEnum $provider
 * @property ScheduleProviderConfig $config
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read Listing $listing
 */
class ScheduleUrl extends Model
{
    use HasUuid;

    protected $fillable = ['uuid', 'listing_id', 'provider', 'config'];

    protected function casts(): array
    {
        return [
            'provider' => ScheduleProviderEnum::class,
            'config' => ScheduleProviderConfigCast::class,
        ];
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }
}
