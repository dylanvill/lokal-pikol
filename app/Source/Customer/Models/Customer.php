<?php

namespace App\Source\Customer\Models;

use App\Models\Traits\HasUuid;
use App\Source\Authentication\Models\User;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    /** @use HasFactory<\App\Source\Customer\Database\Factories\CustomerFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'user_id',
        'first_name',
        'last_name',
        'email',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}