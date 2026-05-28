<?php

namespace App\Http\Scoresheet\ApiModels;

use App\Source\Scoresheet\Models\Game;
use App\Source\Scoresheet\Models\Player;
use App\Source\Scoresheet\Models\Session;
use Spatie\LaravelData\Data;

class SessionApiModel extends Data
{
    private function __construct(
        public string $sessionCode,
        public string $name,
        public string $status,
        /** @var PlayerApiModel[] */
        public array $players,
        /** @var GameApiModel[] */
        public array $games,
        /** @var LeaderboardItemApiModel[] */
        public array $leaderboard,
    ) {}

    public static function fromSession(Session $session): self
    {
        return new self(
            sessionCode: $session->session_code,
            name: $session->name,
            status: $session->status->value,
            players: $session->players->sortBy('name', SORT_NATURAL | SORT_FLAG_CASE)->map(fn (Player $p) => PlayerApiModel::fromPlayer($p))->values()->all(),
            games: $session->games->sortBy('created_at')->map(fn (Game $g) => GameApiModel::fromGame($g))->values()->all(),
            leaderboard: LeaderboardItemApiModel::fromGames($session->games),
        );
    }
}
