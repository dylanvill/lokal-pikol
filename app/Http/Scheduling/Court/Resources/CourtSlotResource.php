<?php

namespace App\Http\Scheduling\Court\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Undocumented class
 */
class CourtSlotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'slot' => $this->slot,
            'display' => $this->display,
            'isAvailable' => $this->isAvailable
        ];
    }
}
