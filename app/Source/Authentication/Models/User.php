<?php

namespace App\Source\Authentication\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Source\Authentication\Database\Factories\UserFactory;
use App\Source\Facility\Models\Facility;
use App\Source\Customer\Models\Customer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;
    protected $fillable = [
        'email',
        'password',
        'role'
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

    public function client(): HasOne
    {
        return $this->hasOne(Client::class);
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class);
    }

    public function getProfileAttribute()
    {
        return $this->role === 'client' ? $this->client : $this->customer;
    }

    public function isClient(): bool
    {
        return $this->role === 'client';
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
