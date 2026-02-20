<?php

namespace App\Source\Reservation\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Models\Court;
use App\Source\Customer\Models\Customer;
use App\Source\Facility\Models\Facility;
use App\Source\Reservation\Database\Factories\ReservationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int $id
 * @property string $uuid
 * @property string $reservable_type
 * @property int $reservable_id
 * @property int $facility_id
 * @property int $court_id
 * @property \Illuminate\Support\Carbon $reservation_date
 * @property string $start_time
 * @property string $end_time
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at    
 */
class Reservation extends Model implements HasMedia
{
    /** @use HasFactory<\App\Source\Reservation\Database\Factories\ReservationFactory> */
    use HasFactory, HasUuid, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'reservable_type',
        'reservable_id',
        'facility_id',
        'court_id',
        'reservation_date',
        'start_time',
        'end_time',
        'status'
    ];

    protected $casts = [
        'reservation_date' => 'date'
    ];

    public function reservable(): MorphTo
    {
        return $this->morphTo();
    }

    public function reservableType(): Customer|Facility
    {
        return $this->reservable;
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    public function fees(): HasMany
    {
        return $this->hasMany(ReservationFee::class);
    }

    protected static function newFactory()
    {
        return ReservationFactory::new();
    }
}
