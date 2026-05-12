<?php

namespace App\Http\Directory\Controllers;

use App\Http\Directory\Requests\ListingRequest;
use App\Http\Directory\Resources\AdResource;
use App\Http\Directory\Resources\ListingResource;
use App\Http\Shared\Contracts\Controller;
use App\Source\Ad\Models\Ad;
use App\Source\Directory\Models\Listing;
use App\Source\Shared\Enums\FacilityCourtTypeEnum;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ListingController extends Controller
{
    const ALL_CITIES_AND_MUNICIPALITIES = 'All cities and municipalities';

    const ALL_COURT_TYPES = 'Any court types';

    const ALL_NUMBER_OF_COURTS = 'Any number of courts';

    public function __invoke(ListingRequest $request)
    {
        $seed = $this->getRandomSeed();

        $listings = Listing::with('socialLinks')
            ->when($request->city, function ($query, $city) {
                $query->where('city', $city);
            })
            ->when($request->courtType, function ($query, $courtType) {
                $query->whereIn('court_type', [$courtType, FacilityCourtTypeEnum::COVERED_AND_OUTDOOR->value]);
            })
            ->when($request->numberOfCourts, function ($query, $numberOfCourts) {
                $query->where('number_of_courts', $numberOfCourts);
            })
            ->withMedia()
            ->when($request->sort === 'name', fn ($q) => $q->orderBy('name'))
            ->when($request->sort === 'numberOfCourts', fn ($q) => $q->orderByDesc('number_of_courts'))
            ->when($request->sort === 'popularity', function ($query) {
                $query->orderByRaw('(
                    SELECT COUNT(*) FROM analytics
                    WHERE analytics.trackable_id = listings.id
                    AND analytics.trackable_type = ?
                    AND analytics.event IN (?, ?, ?)
                    AND analytics.created_at >= ?
                ) DESC', [
                    Listing::class,
                    'book court clicked',
                    'facebook clicked',
                    'instagram clicked',
                    now()->subDays(60),
                ]);
            })
            ->when(! $request->sort, fn ($q) => $q->inRandomOrder($seed))
            ->paginate(12);

        $ad = Ad::getActiveAd();

        return Inertia::render('listing', [
            'listings' => Inertia::scroll(fn () => ListingResource::collection($listings)),
            'cities' => $this->getCities(),
            'courtTypes' => $this->getCourtTypes(),
            'numberOfCourts' => $this->getNumberOfCourts(),
            'filters' => [
                'city' => $request->city ?? null,
                'courtType' => $request->courtType ?? null,
                'numberOfCourts' => $request->numberOfCourts ?? null,
                'sort' => $request->sort ?? null,
            ],
            'ad' => empty($ad) ? null : new AdResource($ad),
        ]);
    }

    private function getRandomSeed(): int
    {
        $seedKey = 'directory_seed_'.session()->getId();

        return Cache::remember($seedKey, now()->addHours(6), fn () => random_int(1, 1000000));
    }

    private function getCourtTypes(): array
    {
        $courtTypes = collect(FacilityCourtTypeEnum::values())
            ->map(fn ($courtType) => ['value' => $courtType, 'label' => $courtType]);

        return [['value' => null, 'label' => self::ALL_COURT_TYPES], ...$courtTypes];
    }

    private function getCities(): array
    {
        $cities = Listing::select('city')
            ->orderBy('city')
            ->groupBy('city')
            ->pluck('city')
            ->sort()
            ->map(fn ($city) => ['value' => $city, 'label' => $city]);

        return [['value' => null, 'label' => self::ALL_CITIES_AND_MUNICIPALITIES], ...$cities];
    }

    private function getNumberOfCourts(): array
    {
        $numberOfCourts = Listing::select('number_of_courts')
            ->orderBy('number_of_courts')
            ->groupBy('number_of_courts')
            ->pluck('number_of_courts')
            ->sort()
            ->map(fn ($number) => ['value' => $number, 'label' => $number]);

        return [['value' => null, 'label' => self::ALL_NUMBER_OF_COURTS], ...$numberOfCourts];
    }
}
