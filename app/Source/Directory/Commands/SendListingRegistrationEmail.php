<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Actions\GenerateListingRegistrationToken\GenerateListingRegistrationToken;
use App\Source\Directory\Mail\ListingRegistrationEmail;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class SendListingRegistrationEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'directory:send-registration-email {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send directory listing registration email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $tokenResult = (new GenerateListingRegistrationToken())->generate();

        $url = URL::temporarySignedRoute(
            'directory.register',
            strtotime($tokenResult->expiresAt),
            ['uuid' => $tokenResult->uuid, 'token' => $tokenResult->token]
        );

        Mail::to($email)->send(new ListingRegistrationEmail($url));

        $this->info('Listing registration email sent to ' . $email);
        $this->info('Registration URL: ' . $url);
    }
}
