<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VisitorLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VisitorLogController extends Controller
{
    public function dailyVisitors()
    {
        $data = VisitorLog::select(
                DB::raw('DATE(visited_at) as date'),
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($data);
    }
}
