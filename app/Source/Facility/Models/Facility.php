<?php

namespace App\Source\Facility\Models;

use App\Models\Traits\HasUuid;
use App\Source\Authentication\Models\User;
use App\Source\Court\Models\Court;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Source\Facility\Database\Factories\FacilityFactory;
use App\Source\Reservation\Models\Reservation;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Facility extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\FacilityFactory> */
    use HasFactory, HasUuid, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'user_id',
        'name',
        'address',
        'email',
        'phone',
        'description',
        'opening_time',
        'closing_time',
        'google_maps_url',
        'city',
    ];

    protected $casts = [
        'opening_time' => 'timestamp',
        'closing_time' => 'timestamp',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courts(): HasMany
    {
        return $this->hasMany(Court::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return FacilityFactory::new();
    }
}
