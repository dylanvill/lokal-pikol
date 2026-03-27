<?php

namespace App\Source\Court\Actions\CreateCourtPricing;

use App\Source\Court\Actions\CreateCourtPricing\Dtos\CreateCourtPricingData;
use App\Source\Court\Models\Court;
use App\Source\Court\Models\CourtPricing;
use Illuminate\Support\Collection;

class CreateCourtPricing
{
    public function __construct(protected Court $court) {}

    /**
     * @param CreateCourtPricingData[] $data
     * @return Collection<CourtPricing>
     */
    public function create(array $data): Collection
    {
        $courtPricings = collect();

        foreach ($data as $pricingData) {
            $courtPricing = new CourtPricing();
            $courtPricing->start_time = $pricingData->startTime;
            $courtPricing->end_time = $pricingData->endTime;
            $courtPricing->price = $pricingData->price;
            $courtPricing->court_id = $this->court->id;
            $courtPricing->save();

            $courtPricings->push($courtPricing);
        }

        return $courtPricings;
    }
}
