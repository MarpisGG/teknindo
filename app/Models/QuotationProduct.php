<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class QuotationProduct extends Model
{
    use HasFactory;

    protected $table = 'quotation_product';

    protected $fillable = ['name'];

    public function quotations()
    {
        return $this->hasMany(Quotation::class, 'quotation_product_id');
    }
}
