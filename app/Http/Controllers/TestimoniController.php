<?php

namespace App\Http\Controllers;

use App\Models\Testimoni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimoniController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:testimonial-list', ['only' => ['index', 'show', 'destroy']]);
        $this->middleware('permission:testimonial-create', ['only' => ['create', 'store']]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonis = Testimoni::all();
        return Inertia::render('admin/testimoni/index', [
            'testimonis' => $testimonis
        ]);
    }

    public function apiindex()
    {
        return response()->json(Testimoni::all());
    }

    public function apishow($id)
    {
        return response()->json(Testimoni::findOrFail($id));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/testimoni/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'testimoni' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Testimoni::create($request->only('name', 'testimoni', 'rating'));

        return redirect()->route('testimoni.index')->with('success', 'Testimoni created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $testimoni = Testimoni::findOrFail($id);
        return Inertia::render('admin/testimoni/edit', [
            'testimoni' => $testimoni
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'testimoni' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $testimoni = Testimoni::findOrFail($id);
        $testimoni->update($request->only('name', 'testimoni', 'rating'));

        return redirect()->route('testimoni.index')->with('success', 'Testimoni updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $testimoni = Testimoni::find($id);
        if ($testimoni) {
            $testimoni->delete();
            return response()->json(['message' => 'Testimoni deleted successfully.']);
        } else {
            return response()->json(['message' => 'Testimoni not found.'], 404);
        }
    }
}
