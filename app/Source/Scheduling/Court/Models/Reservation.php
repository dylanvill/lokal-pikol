<?php

namespace App\Source\Scheduling\Court\Models;

use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $uuid
 * @property int $facility_id
 * @property int $court_id
 * @property string $name
 * @property string $reservation_date
 * @property string $start_time
 * @property string $end_time
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read Court $court
 */
class Reservation extends Model
{
    use HasUuid;

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }
}
