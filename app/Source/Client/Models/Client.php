<?php

namespace App\Source\Client\Models;

use App\Models\Traits\HasUuid;
use App\Source\Authentication\Models\User;
use App\Source\Client\Database\Factories\ClientFactory;
use App\Source\Court\Models\Court;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Client extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory, HasUuid, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'user_id',
        'name',
        'address',
        'email',
        'phone',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courts(): HasMany
    {
        return $this->hasMany(Court::class);
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return ClientFactory::new();
    }
}
