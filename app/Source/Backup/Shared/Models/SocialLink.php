<?php

namespace App\Source\Shared\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class SocialLink extends Model
{
    /** @use HasFactory<\Database\Factories\SocialLinkFactory> */
    use HasFactory;

    protected $fillable = [
        'linkable_id',
        'linkable_type',
        'platform',
        'label',
        'url',
    ];

    public function linkable(): MorphTo
    {
        return $this->morphTo();
    }
}
