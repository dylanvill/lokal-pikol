<?php

namespace App\Source\Customer\Models;

use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    /** @use HasFactory<\App\Source\Customer\Database\Factories\CustomerFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'first_name',
        'last_name',
        'email',
    ];

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}