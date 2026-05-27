<?php

namespace App\Http\Scoresheet\ApiModels;

use App\Source\Scoresheet\Models\Game;
use Spatie\LaravelData\Data;

class GameApiModel extends Data
{
    private function __construct(
        public string $id,
        public string $teamAPlayer1Name,
        public string $teamAPlayer2Name,
        public int $teamAScore,
        public string $teamBPlayer1Name,
        public string $teamBPlayer2Name,
        public int $teamBScore,
    ) {}

    public static function fromGame(Game $game): self
    {
        return new self(
            id: $game->uuid,
            teamAPlayer1Name: $game->teamAPlayer1->name,
            teamAPlayer2Name: $game->teamAPlayer2->name,
            teamAScore: $game->team_a_score,
            teamBPlayer1Name: $game->teamBPlayer1->name,
            teamBPlayer2Name: $game->teamBPlayer2->name,
            teamBScore: $game->team_b_score,
        );
    }
}
