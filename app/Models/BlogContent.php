<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogContent extends Model
{
    use HasFactory;

    protected $table = 'blog_content'; // ✅ wajib ini

    protected $fillable = [
        'blog_id',
        'type',
        'content',
        'image',
        'order',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
