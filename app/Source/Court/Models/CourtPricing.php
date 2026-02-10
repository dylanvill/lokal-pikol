<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourtPricing extends Model
{
    /** @use HasFactory<\Database\Factories\CourtPricingFactory> */
    use HasFactory, HasUuid;
}
