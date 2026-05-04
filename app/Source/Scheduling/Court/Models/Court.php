<?php

namespace App\Source\Scheduling\Court\Models;

use App\Source\Directory\Models\Listing;
use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $uuid
 * @property int $listing_id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read Listing $listing
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Reservation> $reservations
 */
class Court extends Model
{
    use HasUuid, SoftDeletes;

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
