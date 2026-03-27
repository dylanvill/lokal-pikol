<?php

namespace App\Source\Authentication\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * @property int $user_id The ID of the user associated with this authentication provider.
 * @property string $name The name of the authentication provider e.g. google
 * @property string $authentication_id The unique authentication ID.
 * @property array $config The configuration settings for the authentication provider.
 */
class AuthenticationProvider extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'authentication_id',
        'config',
    ];

    protected $casts = [
        'config' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
