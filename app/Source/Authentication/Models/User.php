<?php

namespace App\Source\Authentication\Models;

use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Source\Customer\Models\Customer;
use App\Source\Facility\Models\Facility;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $id
 * @property string $email
 * @property string $password
 * @property string|null $role
 * @property string|null $description
 * @property string|null $google_maps_url
 * @property string|null $city
 * @property string|null $address
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read FacilityAdmin|null $facilityAdmin
 */
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

    public function facilityAdmin(): HasOne
    {
        return $this->hasOne(FacilityAdmin::class);
    }
}
