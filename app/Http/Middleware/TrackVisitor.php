<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\VisitorLog;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use IPinfo\IPinfoBuilder;

class TrackVisitor
{
    public function handle(Request $request, Closure $next): mixed
    {
        if ($request->isMethod('get') && !$request->is('api/*') && !$request->is('admin/*')) {
            try {
                $ip = $request->ip();
                $accessToken = env('IPINFO_TOKEN', '40daa4b8dfc356');

                $client = (new IPinfoBuilder())->setToken($accessToken)->build();
                $details = $client->getDetails($ip);

                VisitorLog::create([
                    'ip_address' => $ip,
                    'user_agent' => $request->userAgent(),
                    'country' => $details->country ?? null,
                    'country_code' => $details->countryCode ?? null,
                    'region' => $details->region ?? null,
                    'city' => $details->city ?? null,
                    'referer' => $request->headers->get('referer'),
                    'page_url' => $request->fullUrl(),
                    'session_id' => Session::getId(),
                    'visited_at' => now(),
                ]);
            } catch (\Throwable $e) {
                Log::error('TrackVisitor error: '.$e->getMessage());
            }
        }

        return $next($request);
    }
}

