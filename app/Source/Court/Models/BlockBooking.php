<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockBooking extends Model
{
    use HasUuid;
    
    // Day constants (0=Sunday, 1=Monday, etc. - matches Carbon/PHP)
    public const SUNDAY = 0;
    public const MONDAY = 1;
    public const TUESDAY = 2;
    public const WEDNESDAY = 3;
    public const THURSDAY = 4;
    public const FRIDAY = 5;
    public const SATURDAY = 6;
    
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
        return match($this->day) {
            self::SUNDAY => 'Sunday',
            self::MONDAY => 'Monday', 
            self::TUESDAY => 'Tuesday',
            self::WEDNESDAY => 'Wednesday',
            self::THURSDAY => 'Thursday',
            self::FRIDAY => 'Friday',
            self::SATURDAY => 'Saturday',
            default => 'Unknown'
        };
    }
}
