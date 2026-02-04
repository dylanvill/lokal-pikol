<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use App\Source\Client\Models\Client;
use App\Source\Court\Database\Factories\CourtFactory;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Court extends Model
{
    /** @use HasFactory<\App\Source\Court\Database\Factories\CourtFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'name',
        'covered',
        'client_id',
    ];

    protected $casts = [
        'covered' => 'boolean',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function courtSlots(): HasMany
    {
        return $this->hasMany(CourtSlot::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    protected static function newFactory()
    {
        return CourtFactory::new();
    }
}
