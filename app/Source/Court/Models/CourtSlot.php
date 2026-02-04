<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Database\Factories\CourtSlotFactory;
use App\Source\Reservation\Models\ReservationSlot;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourtSlot extends Model
{
    /** @use HasFactory<\App\Source\Court\Database\Factories\CourtSlotFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'time',
        'court_id',
        'rate'
    ];

    protected $cats = [
        "rate" => "decimal:2",
    ];

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    public function reservationSlots(): HasMany
    {
        return $this->hasMany(ReservationSlot::class);
    }

    protected static function newFactory()
    {
        return CourtSlotFactory::new();
    }
}
