<?php

namespace App\Source\Scoresheet\Actions\SubmitGame\Dtos;

use App\Source\Scoresheet\Models\Player;
use App\Source\Scoresheet\Models\Session;

readonly class SubmitGameData
{
    public function __construct(
        public Session $session,
        public Player $teamAPlayer1,
        public Player $teamAPlayer2,
        public Player $teamBPlayer1,
        public Player $teamBPlayer2,
        public int $teamAScore,
        public int $teamBScore,
    ) {}
}
