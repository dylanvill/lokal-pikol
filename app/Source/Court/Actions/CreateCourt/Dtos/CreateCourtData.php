<?php

namespace App\Source\Court\Actions\CreateCourt\Dtos;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\UploadedFile;

/**
 * @property string $name
 * @property bool $covered
 * @property int $facilityId
 * @property UploadedFile[] $photos
 */
readonly class CreateCourtData implements Arrayable
{
    public function __construct(
        public string $name,
        public bool $covered,
        public int $facilityId,
        public array $photos = [],
    ) {
        collect($photos)->ensure(UploadedFile::class);
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'covered' => $this->covered,
            'facility_id' => $this->facilityId,
            'photos' => $this->photos,
        ];
    }
}
