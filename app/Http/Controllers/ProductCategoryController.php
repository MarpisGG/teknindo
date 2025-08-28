<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;


class ProductCategoryController extends Controller
{

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('permission:product-list', ['only' => ['index', 'show']]);
        $this->middleware('permission:product-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:product-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:product-delete', ['only' => ['destroy']]);
    }

    public function index()
    {
        $categories = ProductCategory::paginate(10);
        return Inertia::render('admin/categories/index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = ProductCategory::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    public function edit($id){
        $category = ProductCategory::find($id);
        return Inertia::render('admin/categories/edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, $id){
        $category = ProductCategory::find($id);
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->description = $request->description;
        $category->save();

        return response()->json(['message' => 'Category updated successfully', 'category' => $category], 200);
    }

    public function destroy($id){
        $category = ProductCategory::find($id);
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        // Check if the category has products
        if ($category->products()->count() > 0) {
            return response()->json(['error' => 'Cannot delete category with products'], 400);
        }
 
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
