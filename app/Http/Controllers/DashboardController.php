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

use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    private function logFirstVisitOfDay()
    {
        // For testing purposes - use a real IP if needed
        if (app()->environment('production') && env('TEST_IP_ADDRESS')) {
            $ip = env('TEST_IP_ADDRESS');
        } else {
            $ip = request()->ip();
        }
        
        // Check if visitor with same IP has been logged today
        $existingVisitor = VisitorLog::where('ip_address', $ip)
            ->whereDate('visited_at', today())
            ->first();
            
        if (!$existingVisitor) {
            // Only log if this is the first visit of the day
            $location = Location::get($ip);
            if ($location) {
                $country = $location->countryName;
                $city = $location->cityName;
                $latitude = $location->latitude;
                $longitude = $location->longitude;
            } else {
                $country = 'Unknown';
                $city = 'Unknown';
                $latitude = null;
                $longitude = null;
            }

            // Create new visitor log
            VisitorLog::create([
                'ip_address' => $ip,
                'country' => $country,
                'city' => $city,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'visited_at' => now(),
                'page_url' => url()->current(),
                'user_agent' => request()->userAgent(),
                'session_id' => session()->getId(),
            ]);
        }
    }
    
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
            return 100; // If no visitors yesterday, consider it 100% growth
        }
        return round((($todayVisitors - $yesterdayVisitors) / $yesterdayVisitors) * 100, 2);
    }

    //function to list the visitor country data with count
    
    private function getVisitorCityData()
    {
        $totalVisitors = VisitorLog::whereNotNull('city')->count();

        $cityData = VisitorLog::whereNotNull('city')
            ->select('city', DB::raw('count(*) as total'))
            ->groupBy('city')
            ->orderByDesc('total')
            ->get()
            ->map(function ($item) use ($totalVisitors) {
                return [
                    'city' => $item->city ?? 'Unknown',
                    'visitors' => $item->total,
                    'percentage' => $totalVisitors > 0 ? round(($item->total / $totalVisitors) * 100, 2) : 0,
                ];
            });

        return $cityData;
    }


    public function index()
    {

        // Log first visit of the day
        $this->logFirstVisitOfDay();

        $stats = [
            'users' => User::count(),
            'roles' => Role::count(),
            'blogs' => Blog::count(), // Pastikan Blog sudah di-import
            'jobs' => JobList::count(), // Pastikan JobList sudah di-import
            'products' => Product::count(), // Pastikan Product sudah di-impor
            'messages' => Message::count(), // Pastikan Message sudah di-import
            'subscriptions' => Subscription::count(), // Pastikan Subscription sudah di-import
            'quotations' => Quotation::count(), // Pastikan Quotation sudah di-import
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
            'dailyVisitors' => [],
            'locationData' => $this->getVisitorCityData(),
        ]);
    }
}