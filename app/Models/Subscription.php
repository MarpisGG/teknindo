<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'email'
    ];
    protected $table = 'subscription';

    protected $primaryKey = 'id';
}
