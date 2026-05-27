<?php

namespace App\Source\Scoresheet\Commands;

use App\Source\Scoresheet\Actions\EndSession\EndSession;
use App\Source\Scoresheet\Enums\SessionStatusEnum;
use App\Source\Scoresheet\Models\Session;
use Illuminate\Console\Command;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\search;

class EndSessionCommand extends Command
{
    protected $signature = 'scoresheet:end';

    protected $description = 'Mark a scoresheet session as finished';

    public function handle(EndSession $endSession): int
    {
        $sessionId = search(
            label: 'Session',
            options: fn (string $value) => Session::where('status', SessionStatusEnum::ACTIVE)
                ->where(function ($query) use ($value) {
                    $query->where('name', 'like', "%{$value}%")
                        ->orWhere('session_code', 'like', "%{$value}%");
                })
                ->limit(10)
                ->get()
                ->mapWithKeys(fn (Session $session) => [$session->id => "{$session->name} ({$session->session_code})"])
                ->toArray(),
            placeholder: 'Search by session name or code...',
            required: true,
        );

        $session = Session::findOrFail($sessionId);

        if (! confirm("End session \"{$session->name}\" ({$session->session_code})? No more scores can be submitted.")) {
            return Command::SUCCESS;
        }

        $endSession->end($session);

        $this->components->info("Session \"{$session->name}\" has been marked as finished.");

        return Command::SUCCESS;
    }
}
