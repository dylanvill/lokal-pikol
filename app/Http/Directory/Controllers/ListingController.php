<?php

namespace App\Http\Directory\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Directory\Requests\ListingRequest;
use App\Http\Directory\Resources\ListingResource;
use App\Source\Directory\Enums\ListingCourtTypeEnum;
use App\Source\Directory\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListingController extends Controller
{

    const ALL_CITIES_AND_MUNICIPALITIES = 'All cities and municipalities';
    const ALL_COURT_TYPES = 'Any court types';
    const ALL_NUMBER_OF_COURTS = 'Any number of courts';

    public function __invoke(ListingRequest $request)
    {
        $listings = Listing::with('socialLinks')
            ->when($request->city, function ($query, $city) {
                $query->where('city', $city);
            })
            ->when($request->courtType, function ($query, $courtType) {
                $query->whereIn('court_type', [$courtType, ListingCourtTypeEnum::COVERED_AND_OUTDOOR->value]);
            })
            ->when($request->numberOfCourts, function ($query, $numberOfCourts) {
                $query->where('number_of_courts', $numberOfCourts);
            })
            ->withMedia()
            ->paginate(12);

        return Inertia::render('directory/listing', [
            'listings' => Inertia::scroll(fn() => ListingResource::collection($listings)),
            'cities' => $this->getCities(),
            'courtTypes' => $this->getCourtTypes(),
            'numberOfCourts' => $this->getNumberOfCourts(),
            'filters' => [
                'city' => $request->city ?? null,
                'courtType' => $request->courtType ?? null,
                'numberOfCourts' => $request->numberOfCourts ?? null,
            ],
        ]);
    }

    private function getCourtTypes(): array
    {
        $courtTypes = collect(ListingCourtTypeEnum::values())
            ->map(fn($courtType) => ["value" => $courtType, "label" => $courtType]);

        return [["value" => null, "label" => self::ALL_COURT_TYPES], ...$courtTypes];
    }

    private function getCities(): array
    {
        $cities = Listing::select('city')
            ->orderBy('city')
            ->groupBy('city')
            ->pluck('city')
            ->sort()
            ->map(fn($city) => ["value" => $city, "label" => $city]);

        return [["value" => null, "label" => self::ALL_CITIES_AND_MUNICIPALITIES], ...$cities];
    }

    private function getNumberOfCourts(): array
    {
        $numberOfCourts = Listing::select('number_of_courts')
            ->orderBy('number_of_courts')
            ->groupBy('number_of_courts')
            ->pluck('number_of_courts')
            ->sort()
            ->map(fn($number) => ["value" => $number, "label" => $number]);

        return [["value" => null, "label" => self::ALL_NUMBER_OF_COURTS], ...$numberOfCourts];
    }
}
