<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Product;
use App\Models\JobList;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Validate and sanitize input
        $request->validate([
            'query' => 'required|string|min:2|max:100'
        ]);

        $query = trim($request->input('query'));
        
        if (empty($query)) {
            return inertia('SearchResults', [
                'results' => collect([]),
                'query' => $query
            ]);
        }

        // Use parameterized queries to prevent SQL injection
        $blogs = Blog::select('id', 'title', 'slug', 'created_at')
                     ->where('title', 'LIKE', '%' . $query . '%')
                     ->limit(20)
                     ->get()
                     ->map(fn($item) => $item->setAttribute('type', 'blog'));

        $products = Product::select('id', 'slug', 'name', 'description', 'created_at')
                           ->where(function($q) use ($query) {
                               $q->where('name', 'LIKE', '%' . $query . '%')
                                 ->orWhere('description', 'LIKE', '%' . $query . '%');
                           })
                           ->limit(20)
                           ->get()
                           ->map(fn($item) => $item->setAttribute('type', 'product'));

        $jobs = JobList::select('id', 'slug', 'title', 'job_desc', 'created_at')
                       ->where(function($q) use ($query) {
                           $q->where('title', 'LIKE', '%' . $query . '%')
                             ->orWhere('job_desc', 'LIKE', '%' . $query . '%');
                       })
                       ->limit(20)
                       ->get()
                       ->map(fn($item) => $item->setAttribute('type', 'career'));

        // Merge and sort by relevance (you could implement a scoring system)
        $results = $blogs->concat($products)->concat($jobs)
                         ->sortByDesc('created_at') // or implement relevance scoring
                         ->values();

        return inertia('SearchResults', [
            'results' => $results,
            'query' => $query,
            'total' => $results->count()
        ]);
    }
}