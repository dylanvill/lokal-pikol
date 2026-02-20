<?php

namespace App\Source\Shared\Traits;

use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @method string getMorphClass()
 * @property int $id
 * @property string $uuid
 */
trait InteractsWithReservations
{
    public function reservations(): MorphMany
    {
        return $this->morphMany(Reservation::class, 'reservable');
    }
}
