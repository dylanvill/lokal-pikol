<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\ApiModels\ReservationCalendarItemApiModel;
use App\Http\Scheduling\Routes;
use App\Http\Shared\Contracts\Controller;
use App\Http\Shared\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ReservationsController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        /** @var User $user */
        $user = Auth::guard(GuardEnum::FACILITY->value)->user();
        $listing = $user->facilityAdmin->listing;
        $courts = $listing->courts()->orderBy('created_at')->get();

        if ($courts->isEmpty()) {
            return Inertia::render('reservations/reservations', [
                'courts' => [],
                'selectedCourtId' => null,
                'selectedMonth' => now()->format('Y-m'),
                'calendarItems' => [],
            ]);
        }

        $courtUuid = $request->input('court');
        $month = $request->input('month', now()->format('Y-m'));

        if (! $courtUuid || ! $courts->firstWhere('uuid', $courtUuid)) {
            return redirect()->route(Routes::getFullName(Routes::RESERVATIONS), [
                'court' => $courts->first()->uuid,
                'month' => $month,
            ]);
        }

        $court = $courts->firstWhere('uuid', $courtUuid);
        $monthStart = Carbon::parse($month)->startOfMonth();
        $monthEnd = Carbon::parse($month)->endOfMonth();

        $reservationItems = $court->reservations()
            ->with('court')
            ->whereBetween('reservation_date', [$monthStart->toDateString(), $monthEnd->toDateString()])
            ->get()
            ->map(fn ($reservation) => ReservationCalendarItemApiModel::createFromReservation($reservation))
            ->toBase();

        $blockReservations = $court->blockReservations()->with('court')->get();
        $blockItems = collect();
        $current = $monthStart->copy();

        while ($current->lte($monthEnd)) {
            $dayName = strtolower($current->format('l'));
            $blockReservations
                ->filter(fn ($block) => $block->day_of_the_week === $dayName)
                ->each(fn ($block) => $blockItems->push(
                    ReservationCalendarItemApiModel::createFromBlockReservation($block, $current->copy())
                ));
            $current->addDay();
        }

        return Inertia::render('reservations/reservations', [
            'courts' => $courts->map(fn ($c) => ['id' => $c->uuid, 'name' => $c->name])->all(),
            'selectedCourtId' => $court->uuid,
            'selectedMonth' => $month,
            'calendarItems' => $reservationItems->merge($blockItems)->values()->all(),
        ]);
    }
}
