<?php

namespace App\Source\Scoresheet\Models;

use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $uuid
 * @property int $session_id
 * @property string $name
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read Session $session
 */
class Player extends Model
{
    use HasUuid;

    protected $table = 'scoresheet_players';

    public $timestamps = false;

    protected $dates = ['created_at'];

    public function session(): BelongsTo
    {
        return $this->belongsTo(Session::class, 'session_id');
    }
}
