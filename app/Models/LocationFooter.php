<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationFooter extends Model
{
    protected $table = 'location_footer';
    protected $fillable = ['name', 'link'];
}
