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
        $quotations = Quotation::with('product','service')->paginate(10);
        return Inertia::render('admin/quotations/index', [
            'quotations' => $quotations
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'country' => 'nullable|string|max:100',
            'company' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'quotation_product_id' => 'nullable|exists:quotation_product,id',
            'quotation_service_id' => 'nullable|exists:quotation_service,id',
        ]);

        // Custom validation to ensure at least one ID is provided
        $validator->after(function ($validator) use ($request) {
            if (empty($request->quotation_product_id) && empty($request->quotation_service_id)) {
                $validator->errors()->add('selection', 'Please select either a product or service.');
            }
        });

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        Quotation::create($data);

        return response()->json([
            'message' => 'Quotation created successfully.',
            'quotation' => $data
        ], 201);
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
