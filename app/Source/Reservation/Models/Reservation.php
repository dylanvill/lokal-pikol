<?php

namespace App\Source\Reservation\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Models\Court;
use App\Source\Customer\Models\Customer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    /** @use HasFactory<\App\Source\Reservation\Database\Factories\ReservationFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'customer_id',
        'court_id',
        'reservation_date',
        'status'
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    public function reservationSlots(): HasMany
    {
        return $this->hasMany(ReservationSlot::class);
    }
}
