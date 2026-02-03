<?php

namespace App\Http\Admin\Court\Controllers;

use App\Http\Admin\Court\Requests\CreateCourtRequest;
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
        return Inertia::render('admin/courts/createCourt');
    }

    public function store(CreateCourtRequest $request)
    {

        $this->createCourtService->create(
            new CreateCourtData(
                name: $request->name,
                covered: $request->type === "covered",
                clientId: 1
            )
        );

        // Handle form submission, validation, and saving to the database here

        return redirect()->route('admin.courts.index')->with('success', 'Court created successfully!');
    }
}
