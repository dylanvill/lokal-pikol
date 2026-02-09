<?php

namespace App\Http\Customer\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Source\Facility\Models\Facility;
use App\Source\Court\Models\Court;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Inertia\Inertia;
use Inertia\Response;

class CourtsController extends Controller
{

    public function __invoke(): Response
    {

        $facilitys = Facility::with(['courts', 'media'])
            ->get()
            ->map(function ($facility) {
                $courts = $facility->courts;
                $hasCoveredCourts = $courts->where('covered', true)->count() > 0;
                $hasOpenCourts = $courts->where('covered', false)->count() > 0;

                $courtTypes = [];
                if ($hasCoveredCourts) $courtTypes[] = 'covered';
                if ($hasOpenCourts) $courtTypes[] = 'open';

                return [
                    'id' => $facility->uuid,
                    'name' => $facility->name,
                    'numberOfCourts' => $courts->count(),
                    'courtTypes' => $courtTypes, // ['covered'], ['open'], or ['covered', 'open'],
                    'address' => $facility->address,
                    'profilePhoto' => $facility->getFirstMediaUrl(MediaTypeEnum::FACILITY_PROFILE_PHOTO->value),
                    'coverPhoto' => $facility->getFirstMediaUrl(MediaTypeEnum::FACILITY_COVER_PHOTO->value),
                ];
            });


        return Inertia::render('customer/home', ['courts' => $facilitys]);
    }
}
