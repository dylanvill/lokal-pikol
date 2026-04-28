<?php

namespace App\Http\Scheduling\Dashboard;

use App\Http\Shared\Contracts\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return inertia('dashboard/dashboard');
    }
}
