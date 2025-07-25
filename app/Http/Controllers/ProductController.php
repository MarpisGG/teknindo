<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\TypeProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class ProductController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('permission:product-list', ['only' => ['index', 'show']]);
        $this->middleware('permission:product-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:product-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:product-delete', ['only' => ['destroy']]);
    }

    private function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    public function index()
    {
        $products = Product::with(['category', 'type'])
            ->orderBy('order', 'asc')
            ->paginate(10);

        return Inertia::render('admin/Products/Index', ['products' => $products]);
    }

    public function apiIndex()
    {
        $products = Product::select('id', 'name')->orderBy('order')->get();
        return response()->json($products);
    }

    public function create()
    {
        $categories = ProductCategory::all();
        $types = TypeProduct::all();
        return Inertia::render('admin/Products/Create', compact('categories', 'types'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id'    => 'required|exists:products_category,id',
            'type_id'        => 'required|exists:products_type,id',
            'name'           => 'required|string|max:255',
            'description'    => 'required|string',
            'specifications' => 'required|string',
            'image'          => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'brochure'       => 'nullable|mimes:pdf,doc,docx|max:5120',
            'poster'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'order'          => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = $request->file('image') ? $request->file('image')->store('products/images', 'public') : null;
        $posterPath = $request->file('poster') ? $request->file('poster')->store('products/posters', 'public') : null;
        $brochurePath = $request->file('brochure') ? $request->file('brochure')->store('products/brochures', 'public') : null;

        $slug = $this->generateUniqueSlug($request->name);

        $maxOrder = Product::max('order') ?? 0;

        $product = Product::create([
            'category_id'    => $request->category_id,
            'type_id'        => $request->type_id,
            'name'           => $request->name,
            'slug'           => $slug,
            'description'    => $request->description,
            'specifications' => $request->specifications,
            'image'          => $imagePath,
            'poster'         => $posterPath,
            'brochure'       => $brochurePath,
            'order'          => $request->order ?? ($maxOrder + 1),
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = ProductCategory::all();
        $types = TypeProduct::all();
        return Inertia::render('admin/Products/Edit', [
            'products'   => $product,
            'categories' => $categories,
            'types'      => $types
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'category_id'    => 'required|exists:products_category,id',
            'type_id'        => 'required|exists:products_type,id',
            'name'           => 'required|string|max:255',
            'description'    => 'required|string',
            'specifications' => 'required|string',
            'image'          => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'poster'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'brochure'       => 'nullable|mimes:pdf,doc,docx|max:5120',
            'order'          => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $product->image = $request->file('image')->store('products/images', 'public');
        }

        if ($request->hasFile('poster')) {
            if ($product->poster) {
                Storage::disk('public')->delete($product->poster);
            }
            $product->poster = $request->file('poster')->store('products/posters', 'public');
        }

        if ($request->hasFile('brochure')) {
            if ($product->brochure) {
                Storage::disk('public')->delete($product->brochure);
            }
            $product->brochure = $request->file('brochure')->store('products/brochures', 'public');
        }

        $slug = $product->slug;
        if ($request->name !== $product->name) {
            $slug = $this->generateUniqueSlug($request->name);
        }

        $product->update([
            'category_id'    => $request->category_id,
            'type_id'        => $request->type_id,
            'name'           => $request->name,
            'slug'           => $slug,
            'description'    => $request->description,
            'specifications' => $request->specifications,
            'order'          => $request->order ?? $product->order,
        ]);

        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }

    public function moveOrder(Request $request, Product $product)
    {
        $direction = $request->input('direction');

        if (!in_array($direction, ['up', 'down'])) {
            return response()->json(['error' => 'Invalid direction'], 400);
        }

        $currentOrder = $product->order;

        $query = Product::query()
            ->where('order', $direction === 'up' ? '<' : '>', $currentOrder)
            ->orderBy('order', $direction === 'up' ? 'desc' : 'asc');

        $adjacentProduct = $query->first();

        if ($adjacentProduct) {
            $tempOrder = $product->order;
            $product->order = $adjacentProduct->order;
            $adjacentProduct->order = $tempOrder;

            $product->save();
            $adjacentProduct->save();

            return response()->json(['message' => 'Order updated successfully']);
        }

        return response()->json(['message' => 'No adjacent product to swap order with'], 200);
    }

    public function show($slug)
    {
        $product = Product::with(['category', 'type'])->where('slug', $slug)->firstOrFail();
        return Inertia::render('admin/Products/Show', ['product' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        if ($product->poster) {
            Storage::disk('public')->delete($product->poster);
        }
        if ($product->brochure) {
            Storage::disk('public')->delete($product->brochure);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    public function productsByType($slug)
    {
        $type = TypeProduct::where('slug', $slug)->firstOrFail();
        $products = Product::with('category', 'type')
            ->where('type_id', $type->id)
            ->orderBy('order', 'asc')
            ->paginate(10);

        return Inertia::render('Products/Type', [
            'type' => $type,
            'products' => $products,
        ]);
    }

    public function showByType($typeSlug, $productSlug)
    {
        $type = TypeProduct::where('slug', $typeSlug)->firstOrFail();
        $product = Product::with(['category', 'type'])
            ->where('slug', $productSlug)
            ->where('type_id', $type->id)
            ->firstOrFail();

        if ($product->type->slug == 'sparepart') {
            return Inertia::render('products/LandingSparepart', [
                'type' => $type,
                'product' => $product,
            ]);
        }

        return Inertia::render('Products/Show', [
            'type' => $type,
            'product' => $product,
        ]);
    }

    public function sparepartLanding()
    {
        return Inertia::render('products/SparepartLanding');
    }
}
