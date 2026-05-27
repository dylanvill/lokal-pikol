<?php

namespace App\Source\Scoresheet\Actions\SubmitGame;

use App\Source\Scoresheet\Actions\SubmitGame\Dtos\SubmitGameData;
use App\Source\Scoresheet\Models\Game;
use Illuminate\Support\Carbon;

class SubmitGame
{
    public function submit(SubmitGameData $data): Game
    {
        $game = new Game;
        $game->session_id = $data->session->id;
        $game->team_a_player_1_id = $data->teamAPlayer1->id;
        $game->team_a_player_2_id = $data->teamAPlayer2->id;
        $game->team_a_score = $data->teamAScore;
        $game->team_b_player_1_id = $data->teamBPlayer1->id;
        $game->team_b_player_2_id = $data->teamBPlayer2->id;
        $game->team_b_score = $data->teamBScore;
        $game->created_at = Carbon::now();
        $game->save();

        return $game;
    }
}
