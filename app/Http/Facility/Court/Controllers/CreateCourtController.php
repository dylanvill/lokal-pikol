<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Facility\Court\Requests\CreateCourtRequest;
use App\Http\Controllers\Controller;
use App\Http\Enums\GuardEnum;
use App\Source\Authentication\Models\User;
use App\Source\Court\Actions\CreateCourt\CreateCourt;
use App\Source\Court\Actions\CreateCourt\Dtos\CourtSlotData;
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

        $this->createCourtService->create(
            new CreateCourtData(
                name: $request->name,
                covered: $request->type === "covered",
                facilityId: $facility->id,
                photos: $request->photos
            )
        );

        return redirect()->route('facility.courts.index')->with('success', 'Court created successfully!');
    }

    protected function processPricing(Court $court, array $pricing): Collection
    {
        $service = new CreateCourtPricing($court);
        $pricings = [];

        foreach ($pricing as $price) {
            $pricings[] = new CreateCourtPricingData(
                startTime: $price['startTime'],
                endTime: $price['endTime'],
                price: $price['rate']
            );
        }

        return $service->create($pricings);
    }
}
