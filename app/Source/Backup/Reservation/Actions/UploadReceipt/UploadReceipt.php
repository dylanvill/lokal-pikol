<?php

namespace App\Source\Reservation\Actions\UploadReceipt;

use App\Source\MediaLibrary\Enums\MediaTypeEnum;
use App\Source\Reservation\Enums\ReservationStatusEnum;
use App\Source\Reservation\Models\Reservation;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UploadReceipt
{
    public function __construct(protected Reservation $reservation) {}

    public function upload(UploadedFile $file): Media
    {
        $media = $this->reservation->addMedia($file)
            ->toMediaCollection(MediaTypeEnum::RESERVATION_RECEIPTS->value);

        $this->reservation->status = ReservationStatusEnum::PENDING->value;
        $this->reservation->save();
        
        return $media;
    }
}
