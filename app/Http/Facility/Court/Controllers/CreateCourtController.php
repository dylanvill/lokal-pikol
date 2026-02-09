<?php

namespace App\Http\Facility\Court\Controllers;

use App\Http\Facility\Court\Requests\CreateCourtRequest;
use App\Http\Controllers\Controller;
use App\Source\Court\Actions\CreateCourt\CreateCourt;
use App\Source\Court\Actions\CreateCourt\Dtos\CourtSlotData;
use App\Source\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use Inertia\Inertia;
use Illuminate\Http\UploadedFile;
use SplFileObject;

class CreateCourtController extends Controller
{

    public function __construct(protected CreateCourt $createCourtService) {}

    public function show()
    {
        return Inertia::render('facility/courts/createCourt');
    }

    public function store(CreateCourtRequest $request)
    {
        $slots = $this->processSlots($request->slots);
        $this->createCourtService->create(
            new CreateCourtData(
                name: $request->name,
                covered: $request->type === "covered",
                facilityId: 1,
                slots: $slots,
                photos: $request->photos
            )
        );

        return redirect()->route('facility.courts.index')->with('success', 'Court created successfully!');
    }

    protected function processSlots(array $slots): array
    {
        return array_map(function ($slot) {
            return new CourtSlotData(
                time: $slot['time'],
                rate: $slot['rate']
            );
        }, $slots);
    }
}
