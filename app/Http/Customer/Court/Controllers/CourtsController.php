<?php

namespace App\Http\Customer\Court\Controllers;

use App\Http\Controllers\Controller;
use App\Source\Client\Models\Client;
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
                    'uuid' => $client->uuid,
                    'name' => $client->name,
                    'court_count' => $courts->count(),
                    'court_types' => $courtTypes, // ['covered'], ['open'], or ['covered', 'open']
                    'profile_photo' => $client->getFirstMediaUrl(MediaTypeEnum::CLIENT_PROFILE_PHOTO->value),
                    'cover_photo' => $client->getFirstMediaUrl(MediaTypeEnum::CLIENT_COVER_PHOTO->value),
                ];
            });


        return Inertia::render('home', ['courts' => $clients]);
    }
}
