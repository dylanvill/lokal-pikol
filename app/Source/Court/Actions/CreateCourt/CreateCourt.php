<?php

namespace App\Source\Court\Actions\CreateCourt;

use App\Source\Facility\Models\Facility;
use App\Source\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use App\Source\Court\Models\Court;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use Illuminate\Http\UploadedFile;

class CreateCourt
{
    public function create(CreateCourtData $data): Court
    {
        $court = new Court();
        $court->name = $data->name;
        $court->covered = $data->covered;
        $court->facility_id = $data->facilityId;
        $court->save();

        $this->savePhotos($data->photos, $court);
        return $court->refresh();
    }

    protected function savePhotos(array $photos, Court $court)
    {
        foreach ($photos as $photo) {
            $court->addMedia($photo->getRealPath())
                ->usingName($photo->getClientOriginalName())
                ->usingFileName($photo->getClientOriginalName())
                ->toMediaCollection(MediaTypeEnum::COURT_PHOTOS->value);
        }
    }
}
