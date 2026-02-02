<?php

namespace App\Source\Client\Models;

use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'name',
        'address',
        'email',
        'phone',
    ];
}
