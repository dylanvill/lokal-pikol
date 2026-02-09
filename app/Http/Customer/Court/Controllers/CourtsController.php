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

        $clients = Client::with(['courts', 'media'])
            ->get()
            ->map(function ($client) {
                $courts = $client->courts;
                $hasCoveredCourts = $courts->where('covered', true)->count() > 0;
                $hasOpenCourts = $courts->where('covered', false)->count() > 0;

                $courtTypes = [];
                if ($hasCoveredCourts) $courtTypes[] = 'covered';
                if ($hasOpenCourts) $courtTypes[] = 'open';

                return [
                    'id' => $client->uuid,
                    'name' => $client->name,
                    'numberOfCourts' => $courts->count(),
                    'courtTypes' => $courtTypes, // ['covered'], ['open'], or ['covered', 'open'],
                    'address' => $client->address,
                    'profilePhoto' => $client->getFirstMediaUrl(MediaTypeEnum::CLIENT_PROFILE_PHOTO->value),
                    'coverPhoto' => $client->getFirstMediaUrl(MediaTypeEnum::CLIENT_COVER_PHOTO->value),
                ];
            });


        return Inertia::render('customer/home', ['courts' => $clients]);
    }
}
