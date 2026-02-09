<?php

namespace App\Http\Customer\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Customer\Court\Resources\CourtInformationResource;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Inertia\Inertia;
use Inertia\Response;

class CourtController extends Controller
{
    public function __invoke(Facility $facility): Response
    {

        $facility = $facility->load([
            'media' => function ($query) {
                $query->where('collection_name', MediaTypeEnum::CLIENT_PROFILE_PHOTO)->first();
            },
        ]);

        $courts = $facility->courts()->get();

        $courts->load([
            'courtSlots',
            'media' => function ($query) {
                $query->where('collection_name', MediaTypeEnum::COURT_PHOTOS);
            },
        ]);

        // You can add validation, database queries, etc. here
        return Inertia::render('customer/court', [
            'information' => new CourtInformationResource($facility),
            'courts' => $courts
            // 'court' => $client
        ]);
    }
}
