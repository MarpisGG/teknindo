<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorLog extends Model
{
    protected $table = 'visitor_logs';

    protected $fillable = [
        'ip_address',
        'user_agent',
        'country',
        'country_code',
        'city',
        'region',
        'referer',
        'page_url',
        'session_id',
        'visited_at',
        'blog_id', 
    ];

    protected $casts = [
        'visited_at' => 'datetime',
    ];

    public $timestamps = true;
}