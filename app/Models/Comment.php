<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{   

    protected $table = 'comments';

    protected $fillable = [
        'blog_id',
        'name',
        'email',
        'comment',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

}
