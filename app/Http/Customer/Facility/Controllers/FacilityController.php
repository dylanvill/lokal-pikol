<?php

namespace App\Http\Customer\Facility\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Court\Resources\CourtResource;
use App\Http\Customer\Facility\Requests\FacilityRequest;
use App\Http\Customer\Facility\Resources\FacilityResource;
use App\Source\Court\Actions\GetCourtAvailability\GetCourtAvailability;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function __invoke(Facility $facility, FacilityRequest $request): Response
    {
        $lookupDate = $request->input('date', now()->toDateString());
        $facility = $facility->load([
            'media' => function ($query) {
                $query->where('collection_name', MediaTypeEnum::FACILITY_PROFILE_PHOTO)->first();
            },
        ]);

        $courts = $facility->courts()->get();

        $courts->load([
                'courtPricings' => function ($query) {
                    $query->orderBy('start_time');
                },
                'reservations' => function ($query) use ($lookupDate) {
                    $query->where('reservation_date', $lookupDate)
                        ->whereNot('status', ReservationStatusEnum::CANCELLED->value);
                },
            ]);

        // You can add validation, database queries, etc. here
        return Inertia::render('customer/facility', [
            'facility' => new FacilityResource($facility),
            'courts' => CourtResource::collection($courts),
            'lookupDate' => $lookupDate,
        ]);
    }
}
