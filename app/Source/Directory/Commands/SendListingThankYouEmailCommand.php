<?php

namespace App\Source\Directory\Commands;

use App\Source\Directory\Mail\ListingPostedThankYouEmail;
use App\Source\Directory\Models\Listing;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Facades\Mail;

class SendListingThankYouEmailCommand extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'directory:send-listing-thank-you-email {listingId} {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a thank you email for a listing to the listing owner';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $listingId = $this->argument('listingId');
        $email = $this->argument('email');

        /** @var Listing $listing */
        $listing = Listing::find($listingId);
        $message = "Are you sure you want to send the thank you email to {$email} for facility {$listing->name}?";

        if (!$this->confirm($message)) return;

        Mail::to($email)->send(new ListingPostedThankYouEmail($listing));

    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'listingId' => 'Which listing ID should receive the mail?',
            'email' => 'Which email address should receive the mail?',
        ];
    }
}
