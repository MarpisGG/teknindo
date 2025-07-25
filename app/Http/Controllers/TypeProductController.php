<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeProduct as ProductType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class TypeProductController extends Controller
{

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

     public function __construct()
    {
        $this->middleware('permission:product-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:product-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:product-delete', ['only' => ['destroy']]);
    }

    public function index()
    {
        $types = ProductType::paginate(10);
        return Inertia::render('admin/Types/Index', [
            'types' => $types
        ]);
    }
    

    public function create()
    {
        return Inertia::render('admin/Types/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $type = ProductType::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'image' => $request->file('image') ? $request->file('image')->store('images/types', 'public') : null,
        ]);

        return response()->json(['message' => 'Type created successfully', 'type' => $type], 201);
    }

    public function edit($id)
    {
        $type = ProductType::find($id);
        return Inertia::render('admin/Types/Edit', [
            'type' => $type
        ]);
    }

    public function update(Request $request, $id)
    {
        $type = ProductType::find($id);
        if (!$type) {
            return response()->json(['error' => 'Type not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $type->name = $request->name;
        $type->slug = Str::slug($request->name);
        $type->description = $request->description;

        if ($request->hasFile('image')) {
            $type->image = $request->file('image')->store('images/types', 'public');
        }

        $type->save();

        return response()->json(['message' => 'Type updated successfully', 'type' => $type], 200);
    }

    public function show($id)
    {
        $type = ProductType::find($id);
        if (!$type) {
            return response()->json(['error' => 'Type not found'], 404);
        }

        return response()->json(['type' => $type], 200);
    }

    public function apiIndex()
    {
        return response()->json(ProductType::all());
    }

    public function destroy($id)
    {
        $type = ProductType::find($id);
        if (!$type) {
            return response()->json(['error' => 'Type not found'], 404);
        }

        if ($type->products()->count() > 0) {
            return response()->json(['error' => 'Cannot delete type with products'], 400);
        }

        $type->delete();
        return response()->json(['message' => 'Type deleted successfully'], 200);
    }
}
