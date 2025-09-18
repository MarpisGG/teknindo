<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuotationProduct;

class QuotationProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:product-quotation-list', ['only' => ['index']]);
        $this->middleware('permission:product-quotation-create', ['only' => ['create', 'store']]);
    }

    public function index()
    {
        $quotationProducts = QuotationProduct::paginate(10);
        return inertia('admin/quotationproduct/index', [
            'QuotationProducts' => $quotationProducts,
        ]);
    }
    public function indexQuotation()
    {
        $quotationProducts = QuotationProduct::all();
        return response()->json($quotationProducts);
    }

    public function create()
    {
        return inertia('admin/quotationproduct/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $quotationProduct = QuotationProduct::create($validated);
        return redirect()->route('quotation-products.index');
    }

    public function update(Request $request, QuotationProduct $quotationProduct)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $quotationProduct->update($validated);
        return redirect()->route('quotation-products.index');
    }


    public function destroy($id)
    {
        $quotationProduct = QuotationProduct::find($id);
        if ($quotationProduct) {
            $quotationProduct->delete();
            return response()->json(['message' => 'Quotation Product deleted successfully.']);
        } else {
            return response()->json(['message' => 'Quotation Product not found.'], 404);
        }
    }
}
