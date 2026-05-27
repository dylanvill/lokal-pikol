<?php

namespace App\Source\Scoresheet\Actions\RegisterSessionPlayers;

use App\Source\Scoresheet\Actions\RegisterSessionPlayers\Dtos\RegisterSessionPlayersData;
use App\Source\Scoresheet\Models\Player;

class RegisterSessionPlayers
{
    public function register(RegisterSessionPlayersData $data): void
    {
        foreach ($data->playerNames as $name) {
            $player = new Player;
            $player->session_id = $data->session->id;
            $player->name = $name;
            $player->save();
        }
    }
}
