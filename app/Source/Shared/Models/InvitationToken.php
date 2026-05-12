<?php

namespace App\Source\Shared\Models;

use App\Source\Shared\Enums\InvitationTokenTypeEnum;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $token SHA-256 hash of the plain token; never the raw value
 * @property InvitationTokenTypeEnum $type
 * @property array<string, mixed> $metadata Shape varies by type:
 *                                          - FACILITY_ADMIN_INVITE: array{listing_id: int, email: string}
 *                                          - LISTING_REGISTRATION:  (reserved — not yet migrated to this model)
 * @property \Illuminate\Support\Carbon $expires_at
 * @property \Illuminate\Support\Carbon|null $used_at Set when the token is consumed; null if unused
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class InvitationToken extends Model
{
    protected $fillable = [
        'token',
        'type',
        'metadata',
        'expires_at',
        'used_at',
    ];

    /**
     * @return array<string, mixed>
     */
    protected function casts(): array
    {
        return [
            'type' => InvitationTokenTypeEnum::class,
            'metadata' => 'array',
            'expires_at' => 'datetime',
            'used_at' => 'datetime',
        ];
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isUsed(): bool
    {
        return $this->used_at !== null;
    }

    /**
     * Look up a token record by its plain (unhashed) value.
     *
     * The plain token is hashed on the way in so the DB never stores the raw value.
     */
    public static function findByPlainToken(string $plainToken): ?static
    {
        return static::where('token', hash('sha256', $plainToken))->first();
    }
}
