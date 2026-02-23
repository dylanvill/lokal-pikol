<?php

namespace App\Http\Customer\Court\Resources;

use App\Http\Shared\Resources\PhotoResource;
use App\Source\Court\Actions\GetCourtAvailability\GetCourtAvailability;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtResource extends JsonResource
{
    const SLOT_DATE_LOOKUP_KEY = 'dateOfAvailability';


    public function toArray(Request $request): array
    {
        $date = $request->input("date", now()->format('Y-m-d'));
        $slots = (new GetCourtAvailability())->get($this->resource, $date);

        return [
            "id" => $this->uuid,
            "name" => $this->name,
            "covered" => $this->covered,
            "photos" => PhotoResource::collection($this->media),
            "slots" => $slots,
        ];
    }
}
