<?php

namespace App\Source\Court\Actions\CreateCourt\Dtos;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\UploadedFile;

/**
 * @property string $name
 * @property bool $covered
 * @property int $clientId
 * @property CourtSlotData[] $slots
 * @property UploadedFile[] $photos
 */
readonly class CreateCourtData implements Arrayable
{
    public function __construct(
        public string $name,
        public bool $covered,
        public int $clientId,
        public array $slots = [],
        public array $photos = [],
    ) {
        collect($slots)->ensure(CourtSlotData::class);
        collect($photos)->ensure(UploadedFile::class);
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'covered' => $this->covered,
            'client_id' => $this->clientId,
            'slots' => $this->slots,
            'photos' => $this->photos,
        ];
    }
}
