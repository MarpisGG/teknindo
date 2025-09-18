<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    protected $table = 'quotation';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'country',
        'company',
        'message',
        'quotation_product_id',
        'quotation_service_id',
        'followed_up', // Tambahkan ini
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'followed_up' => 'boolean', // Tambahkan ini
    ];

    public function product() {
        return $this->belongsTo(QuotationProduct::class, 'quotation_product_id');
    }

    public function service() {
        return $this->belongsTo(QuotationService::class, 'quotation_service_id');
    }

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d M Y H:i');
    }
}
