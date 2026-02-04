<?php

namespace App\Http\Client\Court\Controllers;

use App\Http\Client\Court\Requests\CreateCourtRequest;
use App\Http\Controllers\Controller;
use App\Source\Court\Actions\CreateCourt\CreateCourt;
use App\Source\Court\Actions\CreateCourt\Dtos\CreateCourtData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateCourtController extends Controller
{

    public function __construct(protected CreateCourt $createCourtService) {}

    public function show()
    {
        return Inertia::render('client/courts/createCourt');
    }

    public function store(CreateCourtRequest $request)
    {

        // $this->createCourtService->create(
        //     new CreateCourtData(
        //         name: $request->name,
        //         covered: $request->type === "covered",
        //         clientId: 1
        //     )
        // );

        // Handle form submission, validation, and saving to the database here

        return redirect()->route('client.courts.index')->with('success', 'Court created successfully!');
    }
}
