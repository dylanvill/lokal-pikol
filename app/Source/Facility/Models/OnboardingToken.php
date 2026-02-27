<?php

namespace App\Source\Facility\Models;

use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class OnboardingToken extends Model
{
    use HasUuid;

    public function markAsUsed(): void
    {
        $this->used = true;
        $this->save();
    }
}
