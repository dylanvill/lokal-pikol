<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Database\Factories\CourtSlotFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourtSlot extends Model
{
    /** @use HasFactory<\App\Source\Court\Database\Factories\CourtSlotFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'time',
        'court_id',
    ];

    protected $casts = [
        'time' => 'datetime:H:i',
    ];

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    protected static function newFactory()
    {
        return CourtSlotFactory::new();
    }
}
