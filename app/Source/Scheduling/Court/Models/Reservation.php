<?php

namespace App\Source\Scheduling\Court\Models;

use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property int $facility_id
 * @property int $court_id
 * @property string $name
 * @property string $reservation_date
 * @property string $start_time
 * @property string $end_time
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Reservation extends Model
{
    use HasUuid;
}
