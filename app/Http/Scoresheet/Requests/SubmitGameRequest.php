<?php

namespace App\Http\Scoresheet\Requests;

use App\Http\Scoresheet\Rules\AllPlayersDistinct;
use App\Source\Scoresheet\Enums\SessionStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubmitGameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->route('session')->status === SessionStatusEnum::ACTIVE;
    }

    public function rules(): array
    {
        $belongsToSession = Rule::exists('scoresheet_players', 'uuid')
            ->where('session_id', $this->route('session')->id);

        return [
            'teamAPlayer1Id' => ['required', 'uuid', $belongsToSession],
            'teamAPlayer2Id' => ['required', 'uuid', $belongsToSession],
            'teamBPlayer1Id' => ['required', 'uuid', $belongsToSession],
            'teamBPlayer2Id' => ['required', 'uuid', $belongsToSession],
            'teamAScore' => ['required', 'integer', 'min:0', 'max:11'],
            'teamBScore' => ['required', 'integer', 'min:0', 'max:11'],
        ];
    }

    public function after(): array
    {
        return [
            new AllPlayersDistinct([
                $this->input('teamAPlayer1Id'),
                $this->input('teamAPlayer2Id'),
                $this->input('teamBPlayer1Id'),
                $this->input('teamBPlayer2Id'),
            ]),
        ];
    }
}
