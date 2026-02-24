<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Enums\BlockBookingDaysEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockBooking extends Model
{
    use HasUuid;

    protected $fillable = [
        'court_id',
        'day',
        'start_time',
        'end_time',
    ];

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    /**
     * Get day name from day number
     */
    public function getDayNameAttribute(): string
    {
        return match ($this->day) {
            BlockBookingDaysEnum::SUNDAY->value => 'Sunday',
            BlockBookingDaysEnum::MONDAY->value => 'Monday',
            BlockBookingDaysEnum::TUESDAY->value => 'Tuesday',
            BlockBookingDaysEnum::WEDNESDAY->value => 'Wednesday',
            BlockBookingDaysEnum::THURSDAY->value => 'Thursday',
            BlockBookingDaysEnum::FRIDAY->value => 'Friday',
            BlockBookingDaysEnum::SATURDAY->value => 'Saturday',
            default => 'Unknown'
        };
    }
}
