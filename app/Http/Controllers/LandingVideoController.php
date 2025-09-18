<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LandingVideo;
use Illuminate\Support\Facades\Storage;

class LandingVideoController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:landing-video-list', ['only' => ['index', 'show', 'destroy']]);
        $this->middleware('permission:landing-video-create', ['only' => ['create', 'store']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/landing-video/index', [
            'landingVideos' => LandingVideo::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/landing-video/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'video' => 'required|file|mimes:mp4,avi,mov,wmv|max:51200',
        ]);

        // Hapus video lama kalau ada
        $oldVideo = LandingVideo::first(); // ambil video pertama (anggap cuma 1 yg dipakai)
        if ($oldVideo) {
            if ($oldVideo->video && Storage::disk('public')->exists($oldVideo->video)) {
                Storage::disk('public')->delete($oldVideo->video);
            }
            $oldVideo->delete();
        }

        // Simpan video baru
        $path = $request->file('video')->store('videos', 'public');

        LandingVideo::create([
            'video' => $path,
        ]);

        return redirect()->back()->with('success', 'Landing Video updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $landingVideo = LandingVideo::findOrFail($id);

        if ($landingVideo->video && Storage::disk('public')->exists($landingVideo->video)) {
            Storage::disk('public')->delete($landingVideo->video);
        }

        $landingVideo->delete();

        return redirect()->back()->with('success', 'Landing Video deleted successfully!');
    }

    public function apiindex()
    {
        return response()->json(LandingVideo::all());
    }
}
