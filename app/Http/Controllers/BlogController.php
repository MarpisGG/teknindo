<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\UploadedFile;
use App\Models\VisitorLog;
use Carbon\Carbon;

class BlogController extends Controller
{

    use ValidatesRequests;

    public function __construct()
    {
        $this->middleware('permission:blog-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:blog-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:blog-delete', ['only' => ['destroy']]);
    }

    public function index()
    {
        $blogs = Blog::with(['user','comments'])->latest()->paginate(10);

        $blogs->each(function ($blog) {
            if ($blog->image) {
                $blog->image = asset('storage/' . $blog->image);
            }
        });

        return Inertia::render('admin/blogs/index', [
            'blogs' => $blogs,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/blogs/create');
    }

public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'contents' => 'required|array',
        'contents.*.type' => 'required|in:text,image',
        'contents.*.content' => 'nullable|string',
        'contents.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'contents.*.order' => 'required|integer',
    ]);

    $slug = Str::slug($request->title);
    $originalSlug = $slug;
    $count = 1;
    while (Blog::where('slug', $slug)->exists()) {
        $slug = $originalSlug . '-' . $count++;
    }

    $thumbnailPath = $request->file('thumbnail')
        ? $request->file('thumbnail')->store('blog', 'public')
        : null;

    $blog = Blog::create([
        'title' => $request->title,
        'slug' => $slug,
        'thumbnail' => $thumbnailPath,
        'user_id' => auth()->id(),
    ]);

foreach ($request->contents as $item) {
    $imagePath = null;

    if (isset($item['image']) && $item['image'] instanceof UploadedFile) {
        $imagePath = $item['image']->store('blog', 'public');
    } elseif (isset($item['existing_image'])) {
        $imagePath = str_replace(asset('storage/'), '', $item['existing_image']);
    }

    $blog->content()->create([
        'type' => $item['type'],
        'content' => $item['type'] === 'text' ? $item['content'] : null,
        'image' => $imagePath,
        'order' => $item['order'],
    ]);
}

    return redirect()->route('blogs.index')->with('success', 'Blog created successfully.');
}


    public function edit($id)
    {
        $blog = Blog::with(['user', 'content'])->findOrFail($id);

        if ($blog->image) {
            $blog->image = asset('storage/' . $blog->image);
        }

        

        return Inertia::render('admin/blogs/edit', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'thumbnail' => $blog->thumbnail ? asset('storage/' . $blog->thumbnail) : null,
                'contents' => $blog->content->map(function ($content) {
                    return [
                        'type' => $content->type,   
                        'content' => $content->content,
                        'image' => $content->image ? asset('storage/' . $content->image) : null,
                        'order' => $content->order,
                    ];
                }),
            ],
        ]);
    }

public function update(Request $request, $id)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'contents' => 'required|array',
        'contents.*.type' => 'required|in:text,image',
        'contents.*.content' => 'nullable|string',
        'contents.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'contents.*.order' => 'required|integer',
    ]);

    $blog = Blog::findOrFail($id);

    $slug = Str::slug($request->title);
    $originalSlug = $slug;
    $count = 1;
    while (Blog::where('slug', $slug)->where('id', '!=', $id)->exists()) {
        $slug = $originalSlug . '-' . $count++;
    }

    if ($request->hasFile('thumbnail')) {
        if ($blog->thumbnail) {
            \Storage::disk('public')->delete($blog->thumbnail);
        }
        $blog->thumbnail = $request->file('thumbnail')->store('blog', 'public');
    }

    $blog->update([
        'title' => $request->title,
        'slug' => $slug,
        'user_id' => auth()->id(),
    ]);

    $blog->content()->delete();

    foreach ($request->contents as $item) {
    $imagePath = null;
    if (isset($item['image']) && $item['image']) {
        $imagePath = $item['image']->store('blog', 'public');
    } elseif (isset($item['existing_image'])) {
        $imagePath = str_replace(asset('storage/'), '', $item['existing_image']);
    }

    $blog->content()->create([
        'type' => $item['type'],
        'content' => $item['type'] === 'text' ? $item['content'] : null,
        'image' => $imagePath,
        'order' => $item['order'],
    ]);
}

    return redirect()->route('blogs.index')->with('success', 'Blog updated successfully.');
}


public function show($slug)
{
try {
    $blog = Blog::with(['user', 'content'])->where('slug', $slug)->firstOrFail();
    $ip = request()->ip();
    $sessionId = session()->getId();

    $lastVisit = VisitorLog::where('ip_address', $ip)
        ->where('blog_id', $blog->id)
        ->where('session_id', $sessionId)
        ->orderBy('visited_at', 'desc')
        ->first();

    $shouldCountView = true;

    if ($lastVisit) {
        $lastVisitTime = Carbon::parse($lastVisit->visited_at);
        if ($lastVisitTime->diffInHours(now()) < 24) {
            $shouldCountView = false;
        }
    }

    if ($shouldCountView) {
        VisitorLog::create([
            'ip_address' => $ip,
            'blog_id' => $blog->id,
            'user_agent' => request()->userAgent(),
            'page_url' => request()->fullUrl(),
            'session_id' => $sessionId,
            'visited_at' => now(),
        ]);
        $blog->increment('views');
    }

    if ($blog->image) {
        $blog->image = asset('storage/' . $blog->image);
    }

    return Inertia::render('admin/blogs/show', [
        'blog' => $blog,
        'slug' => $slug
    ]);
} catch (\Exception $e) {
    return Inertia::render('admin/blogs/show', [
        'blog' => null,
        'slug' => $slug,
        'error' => 'Blog content could not be displayed: ' . $e->getMessage()
    ]);
}
}

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->image) {
            \Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully.']);
    }

public function like($id)
{
    $blog = Blog::findOrFail($id);
    $blog->increment('likes');

    return response()->json([
        'success' => true,
        'message' => 'Blog liked successfully.',
        'likes' => $blog->likes,
    ]);
}

public function unlike($id)
{
    $blog = Blog::findOrFail($id);
    if ($blog->likes > 0) {
        $blog->decrement('likes');
    }

    return response()->json([
        'success' => true,
        'message' => 'Blog unliked successfully.',
        'likes' => $blog->likes,
    ]);
}


    public function apiBlogs()
    {
        $blogs = Blog::with('user')->latest()->paginate(10);

        $blogs->getCollection()->transform(function ($blog) {
            if ($blog->image) {
                $blog->image = asset('storage/' . $blog->image);
            }
            return $blog;
        });

        return response()->json($blogs);
    }



    public function showSlug($slug)
    {
        $blog = Blog::where('slug', $slug)->with(['user', 'content'])->firstOrFail();

        $ip = request()->ip();
    $sessionId = session()->getId();

    $lastVisit = VisitorLog::where('ip_address', $ip)
        ->where('blog_id', $blog->id)
        ->where('session_id', $sessionId)
        ->orderBy('visited_at', 'desc')
        ->first();

    $shouldCountView = true;

    if ($lastVisit) {
        $lastVisitTime = Carbon::parse($lastVisit->visited_at);
        if ($lastVisitTime->diffInHours(now()) < 24) {
            $shouldCountView = false;
        }
    }

    if ($shouldCountView) {
        VisitorLog::create([
            'ip_address' => $ip,
            'blog_id' => $blog->id,
            'user_agent' => request()->userAgent(),
            'page_url' => request()->fullUrl(),
            'session_id' => $sessionId,
            'visited_at' => now(),
        ]);
        $blog->increment('views');
    }


        if ($blog->image) {
            $blog->image = asset('storage/' . $blog->image);
        }

        $blog->content->transform(function ($content) {
            return [
                'type' => $content->type,
                'content' => $content->content,
                'image' => $content->image ? asset('storage/' . $content->image) : null,
                'order' => $content->order,
            ];
        });

        return response()->json([
            'id' => $blog->id,
            'title' => $blog->title,
            'slug' => $blog->slug,
            'thumbnail' => $blog->thumbnail ? asset('storage/' . $blog->thumbnail) : null,
            'likes' => $blog->likes,
            'views' => $blog->views,
            'user' => [
                'name' => $blog->user->name ?? 'Anonymous',
            ],
            'created_at' => $blog->created_at,
            'content' => $blog->content,
        ]);
    }

}

