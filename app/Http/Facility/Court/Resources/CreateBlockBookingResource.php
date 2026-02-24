<?php

namespace App\Http\Facility\Court\Resources;

use App\Source\Court\Actions\GetCourtBlockBookingSchedules\GetCourtBlockBookingSchedules;
use App\Source\Court\Enums\BlockBookingDaysEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreateBlockBookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'covered' => $this->covered,
            'blockBookings' => (new GetCourtBlockBookingSchedules())->get($this->resource, BlockBookingDaysEnum::from($request->input('dayOfTheWeek'))),
        ];
    }
}
