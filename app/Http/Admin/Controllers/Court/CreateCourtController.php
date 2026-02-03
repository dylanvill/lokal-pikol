<?php

namespace App\Http\Admin\Controllers\Court;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateCourtController extends Controller
{
    public function show()
    {
        return Inertia::render('admin/courts/createCourt');
    }
}
