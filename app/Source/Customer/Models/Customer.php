<?php

namespace App\Source\Customer\Models;

use App\Models\Traits\HasUuid;
use App\Source\Authentication\Models\User;
use App\Source\Customer\Database\Factories\CustomerFactory;
use App\Source\Shared\Traits\HasReservations;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    /** @use HasFactory<\App\Source\Customer\Database\Factories\CustomerFactory> */
    use HasFactory, HasUuid, HasReservations;

    protected $fillable = [
        'uuid',
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone',
    ];

    protected function full_name(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => "{$attributes['first_name']} {$attributes['last_name']}"
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    protected static function newFactory()
    {
        return CustomerFactory::new();
    }
}
