<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\ApiModels\CourtBlockReservationApiModel;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ShowCreateBlockReservationsController extends Controller
{
    public function show(): Response
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $courts = $user->facilityAdmin->listing->courts()->with('blockReservations')->orderBy('created_at')->get();

        return Inertia::render('court/createBlockReservations', [
            'courts' => CourtBlockReservationApiModel::fromManyCourts($courts),
        ]);
    }
}
