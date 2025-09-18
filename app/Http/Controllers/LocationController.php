<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Location;

class LocationController extends Controller
{
        public function __construct()
    {
        $this->middleware('permission:location-list', ['only' => ['index', 'show', 'destroy']]);
        $this->middleware('permission:location-create', ['only' => ['create', 'store']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $location = Location::all();

        return Inertia::render('admin/location/index', [
            'locations' => $location
        ]);
    }

    public function apiindex()
    {
        return response()->json(Location::all());
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/location/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'link' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        Location::create([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'link' => $request->link,
            'name' => $request->name,
            'address' => $request->address,
        ]);

        return redirect()->back()->with('success', 'Location created successfully!');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $location = Location::findOrFail($id);

            $location->delete();

            return response()->json(['message' => 'Location deleted successfully.']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Location not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the location.'], 500);
        }
    }


}
