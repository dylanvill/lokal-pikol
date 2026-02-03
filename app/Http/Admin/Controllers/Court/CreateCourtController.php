<?php

namespace App\Http\Admin\Controllers\Court;

use App\Http\Controllers\Controller;
use App\Source\Court\Actions\CreateCourt\CreateCourt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateCourtController extends Controller
{

    public function __construct(protected CreateCourt $createCourtService) {}

    public function show()
    {
        return Inertia::render('admin/courts/createCourt');
    }

    public function store(Request $request)
    {

        dd($request->all());
        // Handle form submission, validation, and saving to the database here

        return redirect()->route('admin.courts.index')->with('success', 'Court created successfully!');
    }
}
