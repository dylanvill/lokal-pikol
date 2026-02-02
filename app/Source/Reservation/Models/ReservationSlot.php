<?php

namespace App\Source\Reservation\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Models\CourtSlot;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationSlot extends Model
{
    /** @use HasFactory<\App\Source\Reservation\Database\Factories\ReservationSlotFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'reservation_id',
        'court_slot_id',
    ];

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    public function courtSlot(): BelongsTo
    {
        return $this->belongsTo(CourtSlot::class);
    }
}