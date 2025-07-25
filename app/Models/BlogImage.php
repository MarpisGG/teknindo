<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Blog;

class BlogImage extends Model
{
    protected $fillable = [
        'blog_id',
        'image',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}