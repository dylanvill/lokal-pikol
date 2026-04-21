<?php

namespace App\Source\Authentication\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Source\Customer\Models\Customer;
use App\Source\Facility\Models\Facility;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasFactory, Notifiable;

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

    /**
     * @return Facility|Customer
     */
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
}
