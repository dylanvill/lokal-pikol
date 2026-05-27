<?php

namespace App\Source\Scoresheet\Actions\RegisterSessionPlayers\Dtos;

use App\Source\Scoresheet\Models\Session;

readonly class RegisterSessionPlayersData
{
    /**
     * @param  string[]  $playerNames
     */
    public function __construct(
        public Session $session,
        public array $playerNames,
    ) {}
}
