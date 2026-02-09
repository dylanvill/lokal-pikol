<?php

namespace App\Source\Authentication\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Source\Authentication\Database\Factories\UserFactory;
use App\Source\Customer\Models\Customer;
use App\Source\Facility\Models\Facility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;
    protected $fillable = [
        'email',
        'password',
        'role',
        'description',
        'google_maps_url',
        'city',
        'address'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function facility(): HasOne
    {
        return $this->hasOne(Facility::class);
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class);
    }

    public function getProfileAttribute()
    {
        return $this->role === 'facility' ? $this->facility : $this->customer;
    }

    public function isFacility(): bool
    {
        return $this->role === 'facility';
    }

    public function isCustomer(): bool
    {
        return $this->role === 'customer';
    }

    protected static function newFactory()
    {
        return UserFactory::new();
    }
}
