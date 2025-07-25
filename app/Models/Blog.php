<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Turahe\Counters\Models\Counter;
use Turahe\Counters\Traits\HasCounter;

class Blog extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'thumbnail',
        'views',
        'likes',
        'content',
        'user_id',
        'created_at',
    ];

    protected $table = 'blogs';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $casts = [
        'slug' => 'string',
    ];

    /**
     * Get the author of the blog post.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_id');
    }
    public function content()
    {
        return $this->hasMany(BlogContent::class);
    }
}
