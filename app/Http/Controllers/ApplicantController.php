<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class ApplicantController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        // Apply permissions for applicant management
        $this->middleware('permission:job-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:job-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:job-delete', ['only' => ['destroy']]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Applied,Under Review,Interview Scheduled,Hired,Rejected',
        ]);

        $applicant = Applicant::findOrFail($id);
        $applicant->status = $request->status;
        $applicant->save();

        return response()->json([
            'success' => true,
            'message' => 'Applicant status updated successfully.',
            'data' => $applicant,
        ]);
    }



    public function destroy($id){
        // Validate the ID
        if (!is_numeric($id)) {
            return response()->json(['error' => 'Invalid applicant ID'], 400);
        }

        // Find the applicant by ID
        $applicant = Applicant::find($id);

        // Check if the applicant exists
        if (!$applicant) {
            return response()->json(['error' => 'Applicant not found'], 404);
        }

        // Delete the applicant
        $applicant->delete();

        // Return a success response
        return response()->json(['message' => 'Applicant deleted successfully'], 200);
    }
}
