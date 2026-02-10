<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Database\Factories\CourtPricingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourtPricing extends Model
{
    /** @use HasFactory<\App\Source\Court\Database\Factories\CourtPricingFactory> */
    use HasFactory, HasUuid;

    protected $fillable = [
        'uuid',
        'start_time',
        'end_time',
        'price',
        'court_id',
    ];

    protected $casts = [
        'start_time' => 'timestamp',
        'end_time' => 'timestamp',
        'price' => 'decimal:2',
    ];

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    protected static function newFactory()
    {
        return CourtPricingFactory::new();
    }
}
