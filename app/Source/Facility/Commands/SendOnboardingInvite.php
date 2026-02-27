<?php

namespace App\Source\Facility\Commands;

use App\Source\Facility\Actions\CreateFacilityOnboardingToken\CreateFacilityOnboardingToken;
use App\Source\Facility\Actions\CreateFacilityOnboardingToken\Dtos\CreateFacilityOnboardingTokenData;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;

class SendOnboardingInvite extends Command implements PromptsForMissingInput
{
    public function __construct(protected CreateFacilityOnboardingToken $createToken) {
        parent::__construct();
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'onboarding:send-invite {email} {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send an onboarding invite to a new facility';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $result = $this->createToken->create(new CreateFacilityOnboardingTokenData(
            email: $this->argument('email'),
            name: $this->argument('name'),
        ));

        dd($result);

        $this->info("Sending onboarding invite to {$this->argument('email')} with name {$this->argument('name')}");
    }


    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'email' => ['Enter the email address that you want to send the onboarding invite to:', 'johndoe@example.com'],
            'name' => ['Enter the name of the facility you want to invite:', 'John Doe\'s Facility'],
        ];
    }
}
