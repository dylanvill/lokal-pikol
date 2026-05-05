<?php

namespace App\Http\Scheduling\Court\Controllers;

use App\Http\Scheduling\Court\Requests\CreateBlockReservationRequest;
use App\Source\Scheduling\Court\Actions\CreateBlockReservation\CreateBlockReservation;
use App\Source\Scheduling\Court\Actions\CreateBlockReservation\Dtos\CreateBlockReservationData;
use App\Source\Scheduling\Court\Enums\BlockReservationDaysEnum;
use App\Source\Scheduling\Court\Models\Court;
use Illuminate\Http\RedirectResponse;

class CreateBlockReservationController
{
    public function store(CreateBlockReservationRequest $request, CreateBlockReservation $action): RedirectResponse
    {

        foreach ($request->courtIds as $courtId) {
            $court = Court::where('uuid', $courtId)->firstOrFail();

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


        return redirect()->back();
    }
}
