<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BusinessController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:business-list', ['only' => ['index', 'destroy']]);
        $this->middleware('permission:business-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:business-edit', ['only' => ['edit', 'update']]);
    }


    public function index()
    {
        $businesses = Business::all();
        return Inertia::render('admin/business/index', [
            'businesses' => $businesses
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/business/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $business = Business::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('business.index')->with('success', 'Business created successfully!');
    }

    public function edit(string $id)
    {
        $business = Business::findOrFail($id);
        return Inertia::render('admin/business/edit', [
            'business' => $business
        ]);
    }


    public function update(Request $request, Business $business)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $business->update([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('business.index')->with('success', 'Business updated successfully!');
    }

    public function destroy($id)
    {
        try {
            $business = Business::findOrFail($id);
            $business->delete();

            return redirect()
                ->route('business.index')
                ->with('success', 'Business deleted successfully.');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect()
                ->route('business.index')
                ->with('error', 'Business not found.');
        } catch (\Exception $e) {
            return redirect()
                ->route('business.index')
                ->with('error', 'An error occurred while deleting the business.');
        }
    }

    public function apiindex()
    {
        return response()->json(Business::all());
    }

    public function show(Business $business)
    {
        return Inertia::render('business-detail', [  // Match your file name
            'business' => $business
        ]);
    }
    
    
}
