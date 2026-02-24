<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Facility\Court\Requests\CourtCalendarRequest;
use App\Http\Facility\Court\Resources\CourtCalendarItemResource;
use App\Http\Facility\Court\Resources\CourtResource;
use App\Source\Court\Actions\GetCourtCalendar\GetCourtCalendar;
use App\Source\Court\Models\Court;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Inertia\Inertia;

class CourtCalendarController extends Controller
{
    public function __invoke(Court $court, CourtCalendarRequest $request, GetCourtCalendar $getCourtCalendar)
    {
        $court->load([
            'media' => function ($query) {
                $query->where('collection_name', MediaTypeEnum::COURT_PHOTOS->value);
            },
            'courtPricings',
        ]);

        $calendarItems = $getCourtCalendar->get($court, $request->input('date', now()->toDateString()));

        return Inertia::render('facility/courts/courtCalendar', [
            'court' => new CourtResource($court),
            'items' => CourtCalendarItemResource::collection($calendarItems),
        ]);
    }
}
