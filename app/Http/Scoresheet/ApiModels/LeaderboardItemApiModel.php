<?php

namespace App\Http\Scoresheet\ApiModels;

use App\Source\Scoresheet\Models\Game;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class LeaderboardItemApiModel extends Data
{
    private function __construct(
        public int $rank,
        public string $name,
        public int $wins,
        public int $gamesPlayed,
        public float $winRate,
    ) {}

    /**
     * @param  Collection<int, Game>  $games
     * @return self[]
     */
    public static function fromGames(Collection $games): array
    {
        $stats = static::aggregateStats($games);
        $stats = static::sortStats($stats);

        return static::assignRanks($stats);
    }

    /**
     * Accumulate wins and games played per player across all games.
     *
     * @param  Collection<int, Game>  $games
     * @return array<int, array{name: string, wins: int, gamesPlayed: int}>
     */
    protected static function aggregateStats(Collection $games): array
    {
        $stats = [];

        foreach ($games as $game) {
            $teamAWon = $game->team_a_score > $game->team_b_score;
            $teamBWon = ! $teamAWon;

            $participants = [
                $game->team_a_player_1_id => ['name' => $game->teamAPlayer1->name, 'isTeamA' => true],
                $game->team_a_player_2_id => ['name' => $game->teamAPlayer2->name, 'isTeamA' => true],
                $game->team_b_player_1_id => ['name' => $game->teamBPlayer1->name, 'isTeamA' => false],
                $game->team_b_player_2_id => ['name' => $game->teamBPlayer2->name, 'isTeamA' => false],
            ];

            foreach ($participants as $playerId => $info) {
                if (! isset($stats[$playerId])) {
                    $stats[$playerId] = ['name' => $info['name'], 'wins' => 0, 'gamesPlayed' => 0];
                }

                $stats[$playerId]['gamesPlayed']++;

                $playerWon = ($info['isTeamA'] && $teamAWon) || (! $info['isTeamA'] && $teamBWon);

                if ($playerWon) {
                    $stats[$playerId]['wins']++;
                }
            }
        }

        return array_values($stats);
    }

    /**
     * Sort by wins descending, then win rate descending (cross-multiply to avoid float
     * precision issues), then alphabetically.
     *
     * @param  array<int, array{name: string, wins: int, gamesPlayed: int}>  $stats
     * @return array<int, array{name: string, wins: int, gamesPlayed: int}>
     */
    protected static function sortStats(array $stats): array
    {
        usort($stats, function (array $a, array $b) {
            $differentWinCounts = $a['wins'] !== $b['wins'];

            if ($differentWinCounts) {
                return $b['wins'] <=> $a['wins'];
            }

            $aWinRateFactor = $a['wins'] * $b['gamesPlayed'];
            $bWinRateFactor = $b['wins'] * $a['gamesPlayed'];
            $differentWinRates = $aWinRateFactor !== $bWinRateFactor;

            if ($differentWinRates) {
                return $bWinRateFactor <=> $aWinRateFactor;
            }

            return $a['name'] <=> $b['name'];
        });

        return $stats;
    }

    /**
     * Assign ranks to sorted stats, sharing the same rank for tied players.
     *
     * @param  array<int, array{name: string, wins: int, gamesPlayed: int}>  $stats
     * @return self[]
     */
    protected static function assignRanks(array $stats): array
    {
        $result = [];
        $rank = 1;

        foreach ($stats as $index => $item) {
            if ($index > 0) {
                $prev = $stats[$index - 1];
                $sameWins = $item['wins'] === $prev['wins'];
                $itemWinRateFactor = $item['wins'] * $prev['gamesPlayed'];
                $prevWinRateFactor = $prev['wins'] * $item['gamesPlayed'];
                $sameWinRate = $itemWinRateFactor === $prevWinRateFactor;
                $sameRank = $sameWins && $sameWinRate;

                if (! $sameRank) {
                    $rank = $index + 1;
                }
            }

            $result[] = new self(
                rank: $rank,
                name: $item['name'],
                wins: $item['wins'],
                gamesPlayed: $item['gamesPlayed'],
                winRate: $item['wins'] / $item['gamesPlayed'],
            );
        }

        return $result;
    }
}
