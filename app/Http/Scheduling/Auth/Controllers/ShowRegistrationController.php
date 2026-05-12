<?php

namespace App\Http\Scheduling\Auth\Controllers;

use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Source\Scheduling\Facility\Dtos\FacilityAdminInviteMetadata;
use App\Source\Shared\Models\InvitationToken;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ShowRegistrationController extends Controller
{
    public function show(string $token): Response|RedirectResponse
    {
        $invitationToken = InvitationToken::findByPlainToken($token);

        if (! $invitationToken || $invitationToken->isUsed()) {
            return redirect()->route(Routes::getFullName(Routes::LOGIN));
        }

        if ($invitationToken->isExpired()) {
            return Inertia::render('auth/invite-expired');
        }

        $metadata = FacilityAdminInviteMetadata::fromArray($invitationToken->metadata);

        return Inertia::render('auth/register', [
            'email' => $metadata->email,
            'token' => $token,
        ]);
    }
}
