<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quotation', function (Blueprint $table) {
            // drop dulu relasi lama ke product
            $table->dropForeign(['product_id']);

            // ubah nama kolom biar lebih jelas (optional)
            $table->renameColumn('product_id', 'quotation_product_id');

            // tambahin foreign key baru
            $table->foreign('quotation_product_id')
                  ->references('id')
                  ->on('quotation_product')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotation', function (Blueprint $table) {
            $table->dropForeign(['quotation_product_id']);
            $table->renameColumn('quotation_product_id', 'product_id');
            $table->foreign('product_id')
                  ->references('id')
                  ->on('product')
                  ->onDelete('cascade');
        });
    }
};
