<?php

namespace App\Source\Reservation\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Models\Court;
use App\Source\Customer\Models\Customer;
use App\Source\Facility\Models\Facility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    /** @use HasFactory<\App\Source\Reservation\Database\Factories\ReservationFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'customer_id',
        'facility_id',
        'court_id',
        'reservation_date',
        'start_time',
        'end_time',
        'status'
    ];

    protected $casts = [
        'reservation_date' => 'date',
        'start_time' => 'time',
        'end_time' => 'time',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }
}
