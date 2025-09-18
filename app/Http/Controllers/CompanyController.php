<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:company-list', ['only' => ['index', 'show', 'destroy']]);
        $this->middleware('permission:company-create', ['only' => ['create', 'store']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::all();
        return Inertia::render('admin/company/index', [
            'companies' => $companies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/company/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'web' => 'nullable|url|max:255',
        ]);

        $path = $request->file('image')->store('companies', 'public');

        Company::create([
            'image' => $path,
            'name' => $validated['name'],
            'description' => $validated['description'],
            'web' => $validated['web'] ?? null,
        ]);

        return redirect()->route('company.index')->with('success', 'Company created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $company = Company::findOrFail($id);

        return Inertia::render('admin/company/edit', [
            'company' => $company
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $company = Company::findOrFail($id);

        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'web' => 'nullable|url|max:255',
        ]);

        if ($request->hasFile('image')) {
            if ($company->image && Storage::disk('public')->exists($company->image)) {
                Storage::disk('public')->delete($company->image);
            }

            $path = $request->file('image')->store('companies', 'public');
            $validated['image'] = $path;
        }

        $company->update($validated);

        return redirect()->route('company.index')->with('success', 'Company updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $company = Company::findOrFail($id);

            if ($company->image && Storage::disk('public')->exists($company->image)) {
                Storage::disk('public')->delete($company->image);
            }

            $company->delete();

            return response()->json(['message' => 'Company deleted successfully.']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Company not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the company.'], 500);
        }
    }
    
    public function apiindex()
    {
        return response()->json(Company::all());
    }
}
