<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuotationService extends Model
{
    use HasFactory;

    protected $table = 'quotation_service';

    protected $fillable = ['name'];

    public function quotations()
    {
        return $this->hasMany(Quotation::class, 'quotation_service_id');
    }
}
