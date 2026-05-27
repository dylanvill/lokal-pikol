<?php

namespace App\Source\Scoresheet\Models;

use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $uuid
 * @property int $session_id
 * @property int $team_a_player_1_id
 * @property int $team_a_player_2_id
 * @property int $team_a_score
 * @property int $team_b_player_1_id
 * @property int $team_b_player_2_id
 * @property int $team_b_score
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read Session $session
 * @property-read Player $teamAPlayer1
 * @property-read Player $teamAPlayer2
 * @property-read Player $teamBPlayer1
 * @property-read Player $teamBPlayer2
 */
class Game extends Model
{
    use HasUuid;

    protected $table = 'scoresheet_games';

    public $timestamps = false;

    protected $dates = ['created_at'];

    public function session(): BelongsTo
    {
        return $this->belongsTo(Session::class, 'session_id');
    }

    public function teamAPlayer1(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'team_a_player_1_id');
    }

    public function teamAPlayer2(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'team_a_player_2_id');
    }

    public function teamBPlayer1(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'team_b_player_1_id');
    }

    public function teamBPlayer2(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'team_b_player_2_id');
    }
}
