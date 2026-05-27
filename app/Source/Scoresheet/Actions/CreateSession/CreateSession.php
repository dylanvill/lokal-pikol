<?php

namespace App\Source\Scoresheet\Actions\CreateSession;

use App\Source\Scoresheet\Enums\SessionStatusEnum;
use App\Source\Scoresheet\Models\Session;

class CreateSession
{
    public function create(string $name): Session
    {
        $session = new Session;
        $session->name = $name;
        $session->status = SessionStatusEnum::ACTIVE;
        $session->save();

        return $session;
    }
}
