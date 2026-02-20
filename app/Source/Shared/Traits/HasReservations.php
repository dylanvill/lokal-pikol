<?php

namespace App\Source\Shared\Traits;

use App\Source\Reservation\Models\Reservation;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasReservations
{
    public function reservations(): MorphMany
    {
        return $this->morphMany(Reservation::class, 'reservable');
    }
}