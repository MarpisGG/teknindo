<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ProductCategory;
use App\Models\TypeProduct as ProductType; // Assuming TypeProduct is the correct model for product

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'type_id',
        'name',
        'slug',
        'description',
        'specifications',
        'brochure',
        'image',
        'poster', // Added poster field
        'order',
    ];

    protected $casts = [
        'specifications' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function type()
    {
        return $this->belongsTo(ProductType::class, 'type_id');
    }

    public function quotations()
    {
        return $this->hasMany(Quotation::class);
    }

}
