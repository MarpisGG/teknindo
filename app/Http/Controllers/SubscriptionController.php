<?php

namespace App\Http\Controllers;
use App\Models\Subscription;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function __construct()
    {
        // Apply permissions for subscription management
        $this->middleware('permission:subscription-list', ['only' => ['index']]);
        $this->middleware('permission:subscription-delete', ['only' => ['destroy']]);
    }

    public function index(){
        $subscriptions = Subscription::all();

        return Inertia::render('admin/subscription/index', [
            'subscriptions' => $subscriptions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:subscription,email',
        ]);

        // Simpan email ke database
        Subscription::create([
            'email' => $request->email,
        ]);

        return redirect()->back()->with('success', 'Subscription successful!');
    }

    public function destroy($id)
    {
        // Validate the ID
        if (!is_numeric($id)) {
            return response()->json(['error' => 'Invalid subscription ID'], 400);
        }

        // Find the subscription by ID
        $subscription = Subscription::find($id);

        // Check if the subscription exists
        if (!$subscription) {
            return response()->json(['error' => 'Subscription not found'], 404);
        }

        // Delete the subscription
        $subscription->delete();

        // Return a success response
        return response()->json(['message' => 'Subscription deleted successfully'], 200);
    }
}
