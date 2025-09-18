<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\LocationFooter;
use Illuminate\Http\Request;

class LocationFooterController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:location-footer-list', ['only' => ['index', 'show', 'destroy']]);
        $this->middleware('permission:location-footer-create', ['only' => ['create', 'store']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/location-footer/index', [
            'locationfooters' => LocationFooter::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/location-footer/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'link' => 'required|url|max:255',
        ]);

        LocationFooter::create([
            'name' => $request->name,
            'link' => $request->link,
        ]);

        return redirect()->back()->with('success', 'Location Footer created successfully!');

    }

    


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $locationfooter = LocationFooter::findOrFail($id);

            $locationfooter->delete();

            return response()->json(['message' => 'Location Footer deleted successfully.']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Location Footer not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the Location Footer.'], 500);
        }
    }

    public function apiindex()
    {
        return response()->json(LocationFooter::all());
    }
}