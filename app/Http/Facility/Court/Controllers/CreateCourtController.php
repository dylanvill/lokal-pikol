<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Facility\Court\Requests\CreateCourtRequest;
use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Court\Actions\CreateCourt\CreateCourt;
use App\Source\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Court\Actions\CreateCourtPricing\CreateCourtPricing;
use App\Source\Court\Actions\CreateCourtPricing\Dtos\CreateCourtPricingData;
use App\Source\Court\Models\Court;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class CreateCourtController extends Controller
{

    public function __construct(
        protected CreateCourt $createCourtService
    ) {}

    public function show()
    {
        return Inertia::render('facility/courts/createCourt');
    }

    public function store(CreateCourtRequest $request)
    {
        /** @var User */
        $user = $request->user(GuardEnum::FACILITY->value);
        $facility = $user->getProfileAttribute();

        $court = $this->createCourtService->create(
            new CreateCourtData(
                name: $request->name,
                covered: $request->type === "covered",
                facilityId: $facility->id,
                photos: $request->photos
            )
        );

        $this->processPricing($court, $request);

        return redirect()->route('facility.courts.index')->with('success', 'Court created successfully!');
    }

    protected function processPricing(Court $court, CreateCourtRequest $request): Collection
    {

        $startTimes = $request->input('startTime', []);
        $endTimes = $request->input('endTime', []);
        $rates = $request->input('rate', []);

        $slots = collect($startTimes)->map(function ($startTime, $index) use ($endTimes, $rates) {
            return [
                'startTime' => $startTime,
                'endTime' => $endTimes[$index],
                'rate' => $rates[$index]
            ];
        })->toArray();

        $service = new CreateCourtPricing($court);
        $pricings = [];

        foreach ($slots as $index => $slot) {
            $pricings[] = new CreateCourtPricingData(
                startTime: $slot['startTime'],
                endTime: $slot['endTime'],
                price: $slot['rate']
            );
        }

        return $service->create($pricings);
    }
}
