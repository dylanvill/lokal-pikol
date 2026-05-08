<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\Requests\CreateBlockReservationRequest;
use App\Source\Scheduling\Court\Actions\CreateBlockReservation\CreateBlockReservation;
use App\Source\Scheduling\Court\Actions\CreateBlockReservation\Dtos\CreateBlockReservationData;
use App\Source\Scheduling\Court\Enums\BlockReservationDaysEnum;
use App\Source\Scheduling\Court\Models\Court;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CreateBlockReservationController
{
    const SUCCESS_MESSAGE_KEY = 'create-block-reservation-success';

    public function store(CreateBlockReservationRequest $request, CreateBlockReservation $action): RedirectResponse
    {
        $courtNames = [];

        foreach ($request->courtIds as $courtId) {
            $court = Court::where('uuid', $courtId)->firstOrFail();
            $courtNames[] = $court->name;

            foreach ($request->daysOfTheWeek as $dayOfTheWeek) {
                $action->create(new CreateBlockReservationData(
                    court: $court,
                    name: $request->name,
                    dayOfTheWeek: (BlockReservationDaysEnum::from(strtolower($dayOfTheWeek)))->value,
                    startTime: $request->startTime,
                    endTime: $request->endTime,
                ));
            }
        }

        Inertia::flash(self::SUCCESS_MESSAGE_KEY, $this->buildSuccessMessage(
            name: $request->name,
            days: $request->daysOfTheWeek,
            courtNames: $courtNames,
            startTime: $request->startTime,
            endTime: $request->endTime,
        ));

        return redirect()->back();
    }

    /**
     * @param  array<string>  $days
     * @param  array<string>  $courtNames
     */
    private function buildSuccessMessage(string $name, array $days, array $courtNames, string $startTime, string $endTime): string
    {
        $daysFormatted = count($days) === 1
            ? $days[0]
            : implode(', ', array_slice($days, 0, -1)).' and '.end($days);

        $courtsFormatted = count($courtNames) === 1
            ? $courtNames[0]
            : implode(', ', array_slice($courtNames, 0, -1)).' and '.end($courtNames);

        $courtLabel = count($courtNames) === 1 ? 'court' : 'courts';

        $startFormatted = Carbon::createFromFormat('H:i', $startTime)->format('g:ia');
        $endFormatted = Carbon::createFromFormat('H:i', $endTime)->format('g:ia');

        return "Block reservation named \"{$name}\" every {$daysFormatted} at {$startFormatted}–{$endFormatted} has been created for {$courtLabel} {$courtsFormatted}.";
    }
}
