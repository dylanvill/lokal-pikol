<?php

namespace App\Http\Scoresheet\ApiModels;

use App\Source\Scoresheet\Models\Player;
use Spatie\LaravelData\Data;

class PlayerApiModel extends Data
{
    private function __construct(
        public string $id,
        public string $name,
    ) {}

    public static function fromPlayer(Player $player): self
    {
        return new self(
            id: $player->uuid,
            name: $player->name,
        );
    }
}
