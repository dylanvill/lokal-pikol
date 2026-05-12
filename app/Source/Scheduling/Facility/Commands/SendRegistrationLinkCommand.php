<?php

namespace App\Source\Scheduling\Facility\Commands;

use App\Http\Scheduling\Routes;
use App\Source\Authentication\Models\User;
use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Facility\Actions\GenerateFacilityAdminInviteToken\GenerateFacilityAdminInviteToken;
use App\Source\Scheduling\Facility\Mail\FacilityAdminInviteEmail;
use App\Source\Scheduling\Facility\Models\FacilityAdmin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\error;
use function Laravel\Prompts\search;
use function Laravel\Prompts\spin;
use function Laravel\Prompts\text;

class SendRegistrationLinkCommand extends Command
{
    protected $signature = 'scheduling:send-registration-link';

    protected $description = 'Send a facility admin registration link to a court manager';

    public function handle(GenerateFacilityAdminInviteToken $action): int
    {
        $listingId = search(
            label: 'Listing',
            options: fn (string $value) => Listing::where('name', 'like', "%{$value}%")->limit(10)->pluck('name', 'id')->toArray(),
            placeholder: 'Type to search listings...',
            required: true,
        );

        $listing = Listing::findOrFail($listingId);

        if (FacilityAdmin::where('listing_id', $listing->id)->exists()) {
            error('This listing already has an admin. Cannot send an invite.');

            return Command::FAILURE;
        }

        $email = text(
            label: 'Email address',
            required: true,
            validate: ['email' => 'required|email'],
        );

        if (User::where('email', $email)->exists()) {
            error("A user with the email {$email} is already registered.");

            return Command::FAILURE;
        }

        $this->table(
            ['Listing', 'Recipient'],
            [[$listing->name, $email]],
        );

        if (! confirm('Send registration link?')) {
            return Command::SUCCESS;
        }

        spin(
            callback: function () use ($action, $listing, $email) {
                $plainToken = $action->generate($listing, $email);
                $url = route(Routes::getFullName(Routes::REGISTER), ['token' => $plainToken]);
                Mail::to($email)->send(new FacilityAdminInviteEmail($url, $listing->name));
            },
            message: 'Sending registration link...',
        );

        $this->info("Registration link sent to {$email}.");

        return Command::SUCCESS;
    }
}
