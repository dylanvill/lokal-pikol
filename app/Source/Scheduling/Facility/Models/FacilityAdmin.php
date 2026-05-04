<?php

namespace App\Source\Scheduling\Facility\Models;

use App\Source\Authentication\Models\User;
use App\Source\Directory\Models\Listing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $listing_id
 * @property string $email
 * @property string $first_name
 * @property string $last_name
 * @property string|null $phone_number
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read \App\Source\Authentication\Models\User $user
 * @property-read \App\Source\Directory\Models\Listing $listing
 */
class FacilityAdmin extends Model
{
    /** @use HasFactory<\Database\Factories\FacilityAdminFactory> */
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }
}
