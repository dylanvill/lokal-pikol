<?php

namespace App\Source\Listing\Commands;

use App\Source\Listing\Actions\GenerateListingRegistrationToken\GenerateListingRegistrationToken;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class SendListingRegistrationEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'listing:send-registration-email {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send listing registration email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $tokenResult = (new GenerateListingRegistrationToken())->generate();

        // $url = URL::signedRoute('find.register', ['uuid' => $tokenResult->uuid, 'token' => $tokenResult->token]);
        $url = URL::temporarySignedRoute(
            'find.register',
            strtotime($tokenResult->expiresAt),
            ['uuid' => $tokenResult->uuid, 'token' => $tokenResult->token]
        );

        dd($url, $email);
    }
}
