<?php

namespace App\Source\Directory\Models;

use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ListingRegistrationToken extends Model
{
    use HasUuid;

    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
