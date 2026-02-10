<?php

namespace App\Http\Customer\Facility\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Court\Resources\CourtListResource;
use App\Source\Facility\Models\Facility;
use App\Source\Court\Models\Court;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Inertia\Inertia;
use Inertia\Response;

class FacilitiesController extends Controller
{

    public function __invoke(): Response
    {

        $facilities = Facility::with([
            'courts',
            'media' => function ($query) {
                $query->whereIn('collection_name', [
                    MediaTypeEnum::FACILITY_PROFILE_PHOTO->value,
                    MediaTypeEnum::FACILITY_COVER_PHOTO->value,
                ]);
            }
        ])
            ->get();


        return Inertia::render('customer/facilities', ['facilities' => $facilities]);
    }
}
