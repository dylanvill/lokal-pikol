<?php

namespace App\Source\Court\Models;

use App\Models\Traits\HasUuid;
use App\Source\Court\Database\Factories\CourtFactory;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Court extends Model implements HasMedia
{
    /** @use HasFactory<\App\Source\Court\Database\Factories\CourtFactory> */
    use HasFactory, HasUuid, InteractsWithMedia;

    protected $fillable = [
        'name',
        'covered',
        'facility_id',
    ];

    protected $casts = [
        'covered' => 'boolean',
    ];

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function courtSlots(): HasMany
    {
        return $this->hasMany(CourtSlot::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    protected static function newFactory()
    {
        return CourtFactory::new();
    }

    #[Scope]
    protected function photos(Builder $query): void
    {
        $query->with(['media' => function ($query) {
            $query->where('collection_name', MediaTypeEnum::COURT_PHOTOS->value);
        }]);
    }
}
