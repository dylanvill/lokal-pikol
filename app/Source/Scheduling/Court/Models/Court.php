<?php

namespace App\Source\Scheduling\Court\Models;

use App\Source\Directory\Models\Listing;
use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Court extends Model
{
    use HasUuid, SoftDeletes;

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
