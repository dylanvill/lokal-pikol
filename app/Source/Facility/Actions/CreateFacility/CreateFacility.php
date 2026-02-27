<?php

namespace App\Source\Facility\Actions\CreateFacility;

use App\Source\Facility\Actions\CreateFacility\Dtos\CreateFacilityData;
use App\Source\Facility\Models\Facility;
use App\Source\MediaLibrary\Enums\MediaTypeEnum;

class CreateFacility
{
    public function create(CreateFacilityData $data): Facility
    {
        $facility = new Facility();
        $facility->user_id = $data->userId;
        $facility->name = $data->name;
        $facility->city = $data->city->value;
        $facility->address = $data->address;
        $facility->google_maps_url = $data->googleMapsUrl;
        $facility->phone = $data->phone;
        $facility->opening_time = $data->openingTime;
        $facility->closing_time = $data->closingTime;
        $facility->description = $data->description;
        $facility->save();

        $facility->addMedia($data->coverPhoto)->toMediaCollection(MediaTypeEnum::FACILITY_COVER_PHOTO->value);
        $facility->addMedia($data->profilePhoto)->toMediaCollection(MediaTypeEnum::FACILITY_PROFILE_PHOTO->value);

        return $facility;
    }
}
