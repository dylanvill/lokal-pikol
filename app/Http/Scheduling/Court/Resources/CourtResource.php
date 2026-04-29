<?php

namespace App\Http\Scheduling\Court\Resources;

use App\Source\Scheduling\Court\Actions\GenerateSlots\GenerateSlots;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $slots = app(GenerateSlots::class)->generate(
            $this->listing->opening_time,
            $this->listing->closing_time,
            $this->reservations,
        );

        return [
            'id'        => $this->uuid,
            'name'      => $this->name,
            'slots'     => CourtSlotResource::collection($slots),
            'createdAt' => $this->created_at,
        ];
    }
}
