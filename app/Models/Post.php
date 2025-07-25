<?php

namespace App\Models;
use Turahe\Counters\Models\Counter;


use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasCounter;
}
