<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use App\Source\Client\Models\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Court extends Model
{
    /** @use HasFactory<\App\Source\Court\Database\Factories\CourtFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'name',
        'covered',
        'client_id',
    ];

    protected $casts = [
        'covered' => 'boolean',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}