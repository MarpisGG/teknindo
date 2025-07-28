<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobList;
use App\Models\Applicant;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class JobListController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('permission:job-list', ['only' => ['index', 'show']]);
        $this->middleware('permission:job-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:job-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:job-delete', ['only' => ['destroy']]);
    }

    public function index() {
        $jobs = JobList::withCount('applicants')->latest()->paginate(10);

        return inertia('admin/joblist/index', [
            'jobs' => $jobs
        ]);
    }

    public function create(){
        return inertia('admin/joblist/create');
    }

    public function store(Request $request){
        try {
            $this->validate($request, [
                'title' => 'required|string|max:255',
                'division' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'salary' => 'required|string|max:255',
                'job_desc' => 'required|string',
                'requirements' => 'required|string',
                'benefit' => 'required|string',
            ]);

            $joblist = JobList::create([
                'title' => $request->title,
                'slug' => \Str::slug($request->title),
                'division' => $request->division,
                'location' => $request->location,
                'type' => $request->type,
                'salary' => $request->salary,
                'job_desc' => $request->job_desc,
                'requirements' => $request->requirements,
                'benefit' => $request->benefit,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Job created successfully.',
                'data' => $joblist
            ], 201);

        } catch (\Throwable $e) {
            \Log::error('Job creation failed: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id){
        $jobs = JobList::with('applicants')->findOrFail($id);
        return inertia('admin/joblist/show', [
            'jobs' => $jobs,
            'slug' => $jobs->slug, 
            'applicants' => $jobs->applicants,
        ]);
    }

    public function edit($id){
        $jobs = JobList::findOrFail($id);
        return inertia('admin/joblist/edit', [
            'jobs' => $jobs,
        ]);
    }

    public function update(Request $request, $id){
        try {
            $this->validate($request, [
                'title' => 'required|string|max:255',
                'division' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'salary' => 'required|string|max:255',
                'job_desc' => 'required|string',
                'requirements' => 'required|string',
                'benefit' => 'required|string',
            ]);

            $joblist = JobList::findOrFail($id);
            $joblist->update([
                'title' => $request->title,
                'slug' => \Str::slug($request->title),
                'division' => $request->division,
                'location' => $request->location,
                'type' => $request->type,
                'salary' => $request->salary,
                'job_desc' => $request->job_desc,
                'requirements' => $request->requirements,
                'benefit' => $request->benefit,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Job updated successfully.',
                'data' => $joblist
            ]);

        } catch (\Throwable $e) {
            \Log::error('Job update failed: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $joblist = JobList::findOrFail($id);
            $joblist->delete();

            return response()->json([
                'success' => true,
                'message' => 'Job deleted successfully.'
            ]);
        } catch (\Exception $e) {
            \Log::error('Job deletion failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete job',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Show job by slug for web pages
    public function showSlug($slug)
    {
        $jobs = JobList::where('slug', $slug)->firstOrFail();

        return inertia('admin/joblist/show', [
            'jobs' => $jobs,
            'slug' => $slug,
        ]);
    }

    // API endpoint to get job by slug
    public function showApi($slug)
    {
        try {
            $joblist = JobList::with('applicants')->where('slug', $slug)->firstOrFail();
            return response()->json($joblist);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Job not found'], 404);
        } 
    }

    // API endpoint to get all jobs
    public function apiJobs()
    {
        try {
            $jobs = JobList::latest()->get();
            return response()->json($jobs);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch jobs'], 500);
        }
    }

    // API endpoint to get job for editing
    public function editApi($id)
    {
        try {
            $joblist = JobList::findOrFail($id);
            return response()->json($joblist);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Job not found'], 404);
        }
    }

}