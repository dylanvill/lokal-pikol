<?php

namespace App\Source\Scheduling\Court\Models;

use App\Source\Directory\Models\Listing;
use App\Source\Shared\Models\HasUuid;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $uuid
 * @property int $listing_id
 * @property int $court_id
 * @property string $name
 * @property string $day_of_the_week
 * @property string $startTime
 * @property string $endTime
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Listing $listing
 * @property-read Court $court
 */
class BlockReservation extends Model
{
    use HasUuid;

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }
}
