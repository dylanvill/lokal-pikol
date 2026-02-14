<?php

namespace App\Source\Reservation\Models;

use App\Models\Traits\HasUuid;
use App\Source\Reservation\Database\Factories\ReservationFeeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationFee extends Model
{
    /** @use HasFactory<\App\Source\Reservation\Database\Factories\ReservationFeeFactory> */
    use HasFactory, HasUuid;

    const SERVICE_FEE_AMOUNT = 5;

    protected $fillable = [
        'uuid',
        'item',
        'description',
        'amount',
        'reservation_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    protected static function newFactory()
    {
        return ReservationFeeFactory::new();
    }
}
