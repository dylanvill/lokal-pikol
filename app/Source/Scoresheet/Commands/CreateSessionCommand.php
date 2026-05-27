<?php

namespace App\Source\Scoresheet\Commands;

use App\Http\Scoresheet\Routes;
use App\Source\Scoresheet\Actions\CreateSession\CreateSession;
use App\Source\Scoresheet\Actions\RegisterSessionPlayers\Dtos\RegisterSessionPlayersData;
use App\Source\Scoresheet\Actions\RegisterSessionPlayers\RegisterSessionPlayers;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\spin;
use function Laravel\Prompts\table;
use function Laravel\Prompts\text;
use function Laravel\Prompts\textarea;

class CreateSessionCommand extends Command
{
    protected $signature = 'scoresheet:create';

    protected $description = 'Create a new scoresheet session';

    public function handle(CreateSession $createSession, RegisterSessionPlayers $registerPlayers): int
    {
        $name = text(
            label: 'Session name',
            placeholder: 'e.g. Wednesday Night — 28 May',
            required: true,
        );

        $raw = textarea(
            label: 'Player names',
            hint: 'Paste from Reclub (numbered list) or enter comma-separated names',
            required: true,
        );

        $playerNames = $this->parsePlayerNames($raw);

        if (empty($playerNames)) {
            $this->components->error('No player names could be parsed from the input.');

            return Command::FAILURE;
        }

        table(
            headers: ['#', 'Player'],
            rows: array_map(fn (int $i, string $name) => [$i + 1, $name], array_keys($playerNames), $playerNames),
        );

        $this->line('');

        if (! confirm("Create session \"{$name}\" with ".count($playerNames).' players?')) {
            return Command::SUCCESS;
        }

        $session = spin(
            callback: function () use ($name, $playerNames, $createSession, $registerPlayers) {
                return DB::transaction(function () use ($name, $playerNames, $createSession, $registerPlayers) {
                    $session = $createSession->create($name);

                    $registerPlayers->register(new RegisterSessionPlayersData(
                        session: $session,
                        playerNames: $playerNames,
                    ));

                    return $session;
                });
            },
            message: 'Creating session...',
        );

        $url = route(Routes::getFullName(Routes::SESSION_SHOW), ['session_code' => $session->session_code]);

        $this->components->info("Session \"{$session->name}\" created successfully.");
        $this->line('');
        $this->line("  Shareable URL: <href={$url}>{$url}</>");

        return Command::SUCCESS;
    }

    /**
     * Accepts Reclub numbered format ("1. Name") or comma-separated names.
     *
     * @return string[]
     */
    private function parsePlayerNames(string $raw): array
    {
        // Split on newlines or commas
        $parts = preg_split('/[\n,]+/', $raw);

        $names = [];
        foreach ($parts as $part) {
            // Strip leading "N. " numbering from Reclub export
            $name = trim(preg_replace('/^\d+\.\s*/', '', $part));

            if ($name !== '') {
                $names[] = $name;
            }
        }

        return $names;
    }
}
