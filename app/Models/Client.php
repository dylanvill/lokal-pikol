<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;
    protected $fillable = [
        'uuid',
        'name',
        'address',
        'email',
        'phone',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($client) {
            if (empty($client->uuid)) {
                $client->uuid = Str::uuid();
            }
        });
    }
}
