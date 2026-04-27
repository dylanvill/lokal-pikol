<?php

namespace App\Source\Scheduling\Facility\Commands;

use App\Source\Directory\Models\Listing;
use App\Source\Scheduling\Facility\Actions\CreateAdminForListing\CreateAdminForListing;
use App\Source\Scheduling\Facility\Actions\CreateAdminForListing\Dtos\CreateFacilityAdminData;
use Illuminate\Console\Command;

use function Laravel\Prompts\form;
use function Laravel\Prompts\info;
use function Laravel\Prompts\spin;
use function Laravel\Prompts\confirm;

class CreateAdminForListingCommand extends Command
{
    protected $signature = 'facility:create-admin {--skipActivation : Skip email verification and password setup}';

    protected $description = 'Create an admin for a facility listing';

    public function handle(CreateAdminForListing $action): void
    {
        $responses = form()
            ->search(label: 'Listing', name: 'listingId', options: fn(string $value) => Listing::where('name', 'like', "%{$value}%")->limit(10)->pluck('name', 'id')->toArray(), placeholder: 'Type to search listings...', required: true)
            ->text(label: 'First name', name: 'firstName', required: true)
            ->text(label: 'Last name', name: 'lastName', required: true)
            ->text(label: 'Email address', name: 'email', required: true, validate: ['email' => 'required|email'])
            ->password(label: 'Password', name: 'password', required: !$this->option('skipActivation'), validate: ['password' => 'required|min:8'])
            ->text(label: 'Contact number', name: 'phoneNumber')
            ->submit();

        $listing = Listing::findOrFail($responses['listingId']);

        $dto = new CreateFacilityAdminData(
            listing: $listing,
            email: $responses['email'],
            password: $responses['password'] ?: null,
            firstName: $responses['firstName'],
            lastName: $responses['lastName'],
            phoneNumber: empty($responses['phoneNumber']) ? null : $responses['phoneNumber'],
        );

        $this->table(
            ['Name', 'Email', 'Listing'],
            [[$dto->firstName . ' ' . $dto->lastName, $dto->email, $listing->name]],
        );
        $confirm = confirm("Are you sure you want to create an admin with the following details?");

        if (!$confirm) return;

        spin(
            callback: fn() => $action->create($dto, (bool) $this->option('skipActivation')),
            message: 'Creating facility admin...',
        );

        $this->info('Facility admin created successfully.');
    }
}
