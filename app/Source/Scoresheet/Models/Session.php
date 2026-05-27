<?php

namespace App\Source\Scoresheet\Models;

use App\Source\Scoresheet\Enums\SessionStatusEnum;
use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $uuid
 * @property string $session_code
 * @property string $name
 * @property SessionStatusEnum $status
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Player> $players
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Game> $games
 */
class Session extends Model
{
    use HasUuid;

    protected $table = 'scoresheet_sessions';

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (self $model) {
            if (empty($model->session_code)) {
                $model->session_code = self::generateUniqueCode();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'status' => SessionStatusEnum::class,
        ];
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class, 'session_id');
    }

    public function games(): HasMany
    {
        return $this->hasMany(Game::class, 'session_id');
    }

    private static function generateUniqueCode(): string
    {
        do {
            $code = strtolower(Str::random(8));
        } while (self::where('session_code', $code)->exists());

        return $code;
    }
}
