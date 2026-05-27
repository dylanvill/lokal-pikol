<?php

namespace App\Http\Scoresheet\Controllers;

use App\Http\Scoresheet\ApiModels\SessionApiModel;
use App\Http\Shared\Contracts\Controller;
use App\Source\Scoresheet\Models\Session;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    public function show(Session $session): Response
    {
        $session->load([
            'players',
            'games.teamAPlayer1',
            'games.teamAPlayer2',
            'games.teamBPlayer1',
            'games.teamBPlayer2',
        ]);

        return Inertia::render('session/show', [
            'session' => SessionApiModel::fromSession($session),
        ]);
    }
}
