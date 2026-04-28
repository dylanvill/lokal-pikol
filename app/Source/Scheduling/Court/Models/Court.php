<?php

namespace App\Source\Scheduling\Court\Models;

use App\Source\Shared\Models\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Court extends Model
{
    use HasUuid, SoftDeletes;
}
