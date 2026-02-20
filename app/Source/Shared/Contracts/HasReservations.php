<?php

namespace App\Source\Shared\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;

interface HasReservations
{
    public function reservations(): MorphMany;

    public function getMorphClass();

    public function reservationNameDisplay(): string;

    public function reservationPhone(): string;

    public function reservationEmail(): string;
}
