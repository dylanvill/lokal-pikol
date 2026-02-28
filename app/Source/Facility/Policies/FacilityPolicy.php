<?php

namespace App\Source\Facility\Policies;

use App\Source\Authentication\Models\User;
use App\Source\Facility\Models\Facility;
use Illuminate\Auth\Access\Response;

class FacilityPolicy
{
    public function canViewUnpublishedFacility(?User $user, Facility $facility): Response
    {
        if ($facility->published === true) return Response::allow();

        return Response::denyAsNotFound();
    }
}
