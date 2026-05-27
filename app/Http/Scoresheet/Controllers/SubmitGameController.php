<?php

namespace App\Http\Scoresheet\Controllers;

use App\Http\Scoresheet\Requests\SubmitGameRequest;
use App\Http\Scoresheet\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Source\Scoresheet\Actions\SubmitGame\Dtos\SubmitGameData;
use App\Source\Scoresheet\Actions\SubmitGame\SubmitGame;
use App\Source\Scoresheet\Models\Player;
use App\Source\Scoresheet\Models\Session;
use Illuminate\Http\RedirectResponse;

class SubmitGameController extends Controller
{
    public function __construct(private SubmitGame $submitGame) {}

    public function store(Session $session, SubmitGameRequest $request): RedirectResponse
    {
        $this->submitGame->submit(new SubmitGameData(
            session: $session,
            teamAPlayer1: Player::where('uuid', $request->teamAPlayer1Id)->firstOrFail(),
            teamAPlayer2: Player::where('uuid', $request->teamAPlayer2Id)->firstOrFail(),
            teamBPlayer1: Player::where('uuid', $request->teamBPlayer1Id)->firstOrFail(),
            teamBPlayer2: Player::where('uuid', $request->teamBPlayer2Id)->firstOrFail(),
            teamAScore: $request->teamAScore,
            teamBScore: $request->teamBScore,
        ));

        return redirect()->route(Routes::getFullName(Routes::SESSION_SHOW), [
            'session' => $session->session_code,
        ]);
    }
}
