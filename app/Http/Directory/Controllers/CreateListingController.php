<?php

namespace App\Http\Directory\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Directory\Requests\CreateListingRequest;

class CreateListingController extends Controller
{
    public function show()
    {
        return inertia('directory/register');
    }

    public function store(CreateListingRequest $request) {
        dd($request->all());
    }
}
