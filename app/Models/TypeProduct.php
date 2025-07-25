<?php

namespace App\Models;
use App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class TypeProduct extends Model
{
    protected $table = 'products_type'; // optional, if table name is not plural of model

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'type_id');
    }
}
