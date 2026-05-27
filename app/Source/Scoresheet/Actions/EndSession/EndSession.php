<?php

namespace App\Source\Scoresheet\Actions\EndSession;

use App\Source\Scoresheet\Enums\SessionStatusEnum;
use App\Source\Scoresheet\Models\Session;

class EndSession
{
    public function end(Session $session): Session
    {
        $session->status = SessionStatusEnum::FINISHED;
        $session->save();

        return $session;
    }
}
