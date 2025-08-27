<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\VisitorLog;
use Stevebauman\Location\Facades\Location;
use Symfony\Component\HttpFoundation\Response;

class VisitorLogMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip logging for API routes, admin routes, or specific paths if needed
        $skipRoutes = [
            'api/*',
            'admin/api/*',
            'telescope/*',
            'horizon/*',
            'livewire/*',
            '_ignition/*',
        ];

        $currentPath = $request->path();
        foreach ($skipRoutes as $skipRoute) {
            if ($request->is($skipRoute)) {
                return $next($request);
            }
        }

        // Skip logging for AJAX requests or specific request types if needed
        if ($request->ajax() || $request->expectsJson()) {
            return $next($request);
        }

        // Skip if it's a bot or crawler (optional)
        $userAgent = $request->userAgent();
        $bots = ['bot', 'crawler', 'spider', 'scraper', 'facebookexternalhit'];
        foreach ($bots as $bot) {
            if (str_contains(strtolower($userAgent ?? ''), $bot)) {
                return $next($request);
            }
        }

        $this->logFirstVisitOfDay($request);

        return $next($request);
    }

    private function logFirstVisitOfDay(Request $request): void
    {
        try {
            // For testing purposes - use a real IP if needed
            if (app()->environment('production') && config('app.test_ip_address')) {
                $ip = config('app.test_ip_address');
            } else {
                $ip = $request->ip();
            }
            
            // Skip if IP is null or localhost
            if (!$ip || $ip === '127.0.0.1' || $ip === '::1') {
                return;
            }
            
            // Check if visitor with same IP has been logged today
            $existingVisitor = VisitorLog::where('ip_address', $ip)
                ->whereDate('visited_at', today())
                ->first();
                
            if (!$existingVisitor) {
                // Only log if this is the first visit of the day
                try {
                    $location = Location::get($ip);
                    if ($location && !empty($location->countryName)) {
                        $country = $location->countryName;
                        $city = $location->cityName ?? 'Unknown';
                        $latitude = $location->latitude;
                        $longitude = $location->longitude;
                    } else {
                        $country = 'Unknown';
                        $city = 'Unknown';
                        $latitude = null;
                        $longitude = null;
                    }
                } catch (\Exception $e) {
                    // Handle location service errors gracefully
                    $country = 'Unknown';
                    $city = 'Unknown';
                    $latitude = null;
                    $longitude = null;
                    
                    // Log error for debugging (optional)
                    \Log::warning('Location service error: ' . $e->getMessage(), ['ip' => $ip]);
                }

                // Create new visitor log
                VisitorLog::create([
                    'ip_address' => $ip,
                    'country' => $country,
                    'city' => $city,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'visited_at' => now(),
                    'page_url' => $request->fullUrl(),
                    'user_agent' => $request->userAgent(),
                    'session_id' => session()->getId(),
                ]);
            }
        } catch (\Exception $e) {
            // Don't let visitor logging break the application
            \Log::error('Visitor logging error: ' . $e->getMessage(), [
                'ip' => $request->ip(),
                'url' => $request->fullUrl()
            ]);
        }
    }
}