<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Shared\Contracts\Controller;
use App\Http\Facility\Court\Requests\CreateBlockBookingRequest;
use App\Http\Facility\Court\Resources\CreateBlockBookingResource;
use App\Source\Court\Actions\CreateCourtBlockBooking\CreateCourtBlockBooking;
use App\Source\Court\Actions\CreateCourtBlockBooking\Dtos\CreateCourtBlockBookingData;
use App\Source\Court\Enums\BlockBookingDaysEnum;
use App\Source\Court\Models\Court;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\CourtSlot;
use App\Source\Shared\Actions\TimeToSlotConversion\Dtos\Range;
use App\Source\Shared\Actions\TimeToSlotConversion\SlotsToRange;
use Inertia\Inertia;

class CreateBlockBookingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function show(Court $court)
    {
        return Inertia::render('facility/courts/createBlockBooking', [
            'court' => new CreateBlockBookingResource($court)
        ]);
    }

    /**
     * Handle the incoming request.
     */
    public function store(Court $court, CreateBlockBookingRequest $request, CreateCourtBlockBooking $createCourtBlockBooking)
    {
        $range = $this->parseRange($request->slots);

        $data = new CreateCourtBlockBookingData(
            courtId: $court->id,
            name: $request->name,
            day: BlockBookingDaysEnum::from($request->dayOfTheWeek),
            startTime: $range->startTime,
            endTime: $range->endTime,
        );

        $createCourtBlockBooking->create($data);

        $startTime = date('g:i A', strtotime($data->startTime));
        $endTime = date('g:i A', strtotime($data->endTime));

        $message = "Block booking named '{$data->name}' created successfully for court '{$court->name}' every {$data->day->name} from {$startTime} to {$endTime}.";

        return Inertia::flash('success', $message)->back();
    }

    public function parseRange(array $slots): Range
    {
        $range = SlotsToRange::convert(collect($slots)->map(function ($slot) {
            $time = explode('-', $slot);
            return new CourtSlot($time[0], $time[1]);
        })->all());

        return new Range($range->startTime, $range->endTime);
    }
}
