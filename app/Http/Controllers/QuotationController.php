<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class QuotationController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:quotation-list', ['only' => ['index', 'show']]);
        // $this->middleware('permission:product-delete', ['only' => ['destroy']]);
    }

    public function index()
    {
        $quotations = Quotation::with('product')->paginate(10);
        return Inertia::render('admin/quotations/index', [
            'quotations' => $quotations
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'country' => 'nullable|string|max:100',
            'company' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'quotation_product_id' => 'required|exists:quotation_product,id',
        ]);

        Quotation::create($data);

        return redirect()->back()->with('success', 'Quotation created successfully.');
    }

    public function toggleFollowUp($id)
    {
        $quotation = Quotation::findOrFail($id);
        $quotation->followed_up = !$quotation->followed_up;
        $quotation->save();

        return response()->json([
            'message' => 'Follow-up status updated.',
            'followed_up' => $quotation->followed_up
        ]);
    }

    public function destroy($id)
    {
        $quotation = Quotation::findOrFail($id);
        $quotation->delete();

        return response()->json(['message' => 'Quotation deleted successfully'], 200);
    }
}
