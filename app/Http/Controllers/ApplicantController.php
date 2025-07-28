<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Storage;
use Exception;

class ApplicantController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        // Remove middleware from store method - only apply to edit/delete
        $this->middleware('permission:job-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:job-delete', ['only' => ['destroy']]);
    }

    public function store(Request $request)
    {
        try {
            // Validate the request
            $validatedData = $this->validate($request, [
                'job_id' => 'required|exists:jobs_listing,id',
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:applicants,email',
                'phone' => 'required|string|max:20',
                'education' => 'required|string|max:255',
                'address' => 'required|string|max:500',
                'resume' => 'required|file|mimes:pdf,doc,docx|max:5120', // Increased to 5MB
                'expected_salary' => 'required|string|max:255',
                'start_date' => 'required|date|after_or_equal:today',
            ], [
                'job_id.required' => 'Job selection is required.',
                'job_id.exists' => 'Selected job does not exist.',
                'email.unique' => 'You have already applied for this position.',
                'resume.required' => 'Resume file is required.',
                'resume.mimes' => 'Resume must be a PDF, DOC, or DOCX file.',
                'resume.max' => 'Resume file size must not exceed 5MB.',
                'start_date.after_or_equal' => 'Start date must be today or in the future.',
            ]);

            // Handle file upload
            $resumePath = null;
            if ($request->hasFile('resume')) {
                $resumePath = $request->file('resume')->store('resumes', 'public');
            }

            // Create the applicant
            $applicant = Applicant::create([
                'job_id' => $validatedData['job_id'],
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'resume' => $resumePath,
                'phone' => $validatedData['phone'],
                'education' => $validatedData['education'],
                'address' => $validatedData['address'],
                'expected_salary' => $validatedData['expected_salary'],
                'start_date' => $validatedData['start_date'],
                'status' => 'Applied', // Set default status
                'applicant_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Application submitted successfully.',
                'data' => $applicant,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            \Log::error('Applicant creation failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while submitting your application. Please try again.',
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
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
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update applicant status.',
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
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

            // Delete the resume file if it exists
            if ($applicant->resume && Storage::disk('public')->exists($applicant->resume)) {
                Storage::disk('public')->delete($applicant->resume);
            }

            // Delete the applicant
            $applicant->delete();

            // Return a success response
            return response()->json(['message' => 'Applicant deleted successfully'], 200);

        } catch (Exception $e) {
            \Log::error('Applicant deletion failed: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Failed to delete applicant'
            ], 500);
        }
    }
}