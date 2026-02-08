<?php

namespace App\Source\Court\Actions\CreateCourt\Dtos;

use App\Source\Client\Models\Client;
use Illuminate\Contracts\Support\Arrayable;

/**
 * @property string $name
 * @property bool $covered
 * @property int $clientId
 * @property CourtSlotData[] $slots
 */
readonly class CreateCourtData implements Arrayable
{
    public function __construct(
        public string $name,
        public bool $covered,
        public int $clientId,
        public array $slots = []
    ) {
        collect($slots)->ensure(CourtSlotData::class);
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'covered' => $this->covered,
            'client_id' => $this->clientId,
            'slots' => $this->slots
        ];
    }
}
