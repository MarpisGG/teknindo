<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\VisitorLog;
use App\Models\User;
use Spatie\Permission\Models\Role;
use App\Models\Blog;
use App\Models\JobList;
use App\Models\Product;
use App\Models\Message;
use App\Models\Subscription;
use App\Models\Quotation;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //function to count yesterday's visitors
    private function countYesterdayVisitors()
    {
        $yesterday = now()->subDay();
        return VisitorLog::whereDate('visited_at', $yesterday)
            ->whereNotNull('city')
            ->count();
    }

    //function to count today's visitors
    private function countTodayVisitors()
    {
        $today = now();
        return VisitorLog::whereDate('visited_at', $today)
            ->whereNotNull('city')
            ->count();
    }

    //function to count the growth percentage of visitors
    private function calculateGrowthPercentage()
    {
        $todayVisitors = $this->countTodayVisitors();
        $yesterdayVisitors = $this->countYesterdayVisitors();
        if ($yesterdayVisitors == 0) {
            return $todayVisitors > 0 ? 100 : 0; // If no visitors yesterday but visitors today, 100% growth
        }
        return round((($todayVisitors - $yesterdayVisitors) / $yesterdayVisitors) * 100, 2);
    }

    //function to list the visitor city data with count
    private function getVisitorCityData()
    {
        $totalVisitors = VisitorLog::whereNotNull('city')->count();

        $cityData = VisitorLog::whereNotNull('city')
            ->select('city', 'country', DB::raw('count(*) as total'))
            ->groupBy('city', 'country')
            ->orderByDesc('total')
            ->get()
            ->map(function ($item) use ($totalVisitors) {
                return [
                    'city' => $item->city ?? 'Unknown',
                    'country' => $item->country ?? 'Unknown',
                    'visitors' => $item->total,
                    'percentage' => $totalVisitors > 0 ? round(($item->total / $totalVisitors) * 100, 2) : 0,
                ];
            });

        return $cityData;
    }

    //function to get daily visitors data for the last 7 days
    private function getDailyVisitorsData()
    {
        $dailyData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $visitors = VisitorLog::whereDate('visited_at', $date)
                ->whereNotNull('city')
                ->count();
            
            $dailyData[] = [
                'date' => $date->format('Y-m-d'),
                'day' => $date->format('D'),
                'visitors' => $visitors
            ];
        }
        return $dailyData;
    }

    public function index()
    {
        $stats = [
            'users' => User::count(),
            'roles' => Role::count(),
            'blogs' => Blog::count(),
            'jobs' => JobList::count(),
            'products' => Product::count(),
            'messages' => Message::count(),
            'subscriptions' => Subscription::count(),
            'quotations' => Quotation::count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'visitorStats' => [
                'total_visitors' => $this->getVisitorCityData()->sum('visitors'),
                'today_visitors' => $this->countTodayVisitors(),
                'yesterday_visitors' => $this->countYesterdayVisitors(),
                'growth_percentage' => $this->calculateGrowthPercentage(),
                'visitor_country_data' => $this->getVisitorCityData(),
            ],
            'dailyVisitors' => $this->getDailyVisitorsData(),
            'locationData' => $this->getVisitorCityData(),
        ]);
    }
}