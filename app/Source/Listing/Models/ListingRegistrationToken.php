<?php

namespace App\Source\Listing\Models;

use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ListingRegistrationToken extends Model
{
    use HasUuid;

    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
