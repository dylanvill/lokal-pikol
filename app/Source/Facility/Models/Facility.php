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
use App\Source\Shared\Contracts\HasReservations;
use App\Source\Shared\Traits\InteractsWithReservations;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Facility extends Model implements HasMedia, HasReservations
{
    /** @use HasFactory<\Database\Factories\FacilityFactory> */
    use HasFactory, HasUuid, InteractsWithMedia, Notifiable, InteractsWithReservations;

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

    public function reservationNameDisplay(): string
    {
        return $this->name;
    }

    public function reservationPhone(): string
    {
        return $this->phone;
    }

    public function reservationEmail(): string
    {
        return $this->email;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courts(): HasMany
    {
        return $this->hasMany(Court::class);
    }

    public function customerReservations(): HasMany
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
