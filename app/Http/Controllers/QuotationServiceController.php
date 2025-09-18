<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuotationService;

class QuotationServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:product-quotation-list', ['only' => ['index']]);
        $this->middleware('permission:product-quotation-create', ['only' => ['create', 'store']]);
    }

    public function index()
    {
        $quotationServices = QuotationService::paginate(10);
        return inertia('admin/quotationservice/index', [
            'QuotationServices' => $quotationServices,
        ]);
    }
    public function indexQuotation()
    {
        $quotationServices = QuotationService::all();
        return response()->json($quotationServices);
    }

    public function create()
    {
        return inertia('admin/quotationservice/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $quotationService = QuotationService::create($validated);
        return redirect()->route('quotation-services.index');
    }

    public function update(Request $request, QuotationService $quotationService)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $quotationService->update($validated);
        return redirect()->route('quotation-services.index');
    }

    public function destroy($id)
    {
        $quotationService = QuotationService::find($id);
        if ($quotationService) {
            $quotationService->delete();
            return response()->json(['message' => 'Quotation Service deleted successfully.']);
        } else {
            return response()->json(['message' => 'Quotation Service not found.'], 404);
        }
    }
}
