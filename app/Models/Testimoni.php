<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimoni extends Model
{
    protected $table = 'testimoni'; // pakai singular
    protected $fillable = ['name', 'testimoni', 'rating'];
}
