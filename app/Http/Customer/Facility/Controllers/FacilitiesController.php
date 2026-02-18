<?php

namespace App\Http\Customer\Facility\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Facility\Requests\FacilitiesRequest;
use App\Http\Customer\Facility\Resources\FacilityListResource;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

use function Symfony\Component\Clock\now;

class FacilitiesController extends Controller
{

    public function __invoke(FacilitiesRequest $request): Response
    {

        $date = $request->date ?? Carbon::now()->format('Y-m-d');
        $startTime = $request->startTime ?? Carbon::now()->addHour()->startOfHour()->format('H:i');
        $endTime = $request->endTime ?? Carbon::now()->addHours(3)->startOfHour()->format('H:i');
        $city = $request->city ?? null;

        $queryData = [
            'date' => $date,
            'startTime' => $startTime,
            'endTime' => $endTime,
            'city' => $city,
        ];

        $facilities = Facility::with([
            'courts',
            'courts.courtPricings',
            'courts.reservations' => function ($query) use ($date) {
                $query->whereDate('reservation_date', $date);
            },
            'media' => function ($query) {
                $query->whereIn('collection_name', [
                    MediaTypeEnum::FACILITY_PROFILE_PHOTO->value,
                    MediaTypeEnum::FACILITY_COVER_PHOTO->value,
                ]);
            }
        ])
            ->whereHas('courts')
            ->where(function ($query) use ($date, $startTime, $endTime) {
                $query->whereDoesntHave('reservations', function ($reservationQuery) use ($date, $startTime, $endTime) {
                    $reservationQuery->whereDate('reservation_date', $date)
                        ->where(function ($timeQuery) use ($startTime, $endTime) {
                            // Check for overlapping times
                            $timeQuery->where(function ($overlap) use ($startTime, $endTime) {
                                // Reservation starts before our end time AND ends after our start time
                                $overlap->where('start_time', '<', $endTime)
                                    ->where('end_time', '>', $startTime);
                            });
                        });
                });
            })
            ->when($city, function ($query, $city) {
                $query->where('city', $city);
            })
            ->paginate(15);

        return Inertia::render('customer/facilities', [
            'facilities' => Inertia::scroll(fn() => FacilityListResource::collection($facilities)),
            'queryData' => $queryData
        ]);
    }
}
