<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'country',
    'company',
    'message',
    'followed_up', // Tambahkan ini
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'followed_up' => 'boolean', // Tambahkan ini
    ];

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d M Y H:i');
    }
}
