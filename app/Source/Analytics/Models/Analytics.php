<?php

namespace App\Source\Analytics\Models;

use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @property int $id
 * @property string $uuid
 * @property string|null $trackable_type
 * @property string|null $trackable_id
 * @property string $event
 * @property string $domain
 * @property array|null $metadata
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read Model|null $trackable
 */
class Analytics extends Model
{
    use HasUuid;

    protected $fillable = [
        'trackable_type',
        'trackable_id',
        'event',
        'domain',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function trackable(): MorphTo
    {
        return $this->morphTo();
    }
}
