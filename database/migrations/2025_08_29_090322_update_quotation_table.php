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
            // No need to drop foreign key since it doesn't exist
            // The column already exists and is named quotation_product_id
            
            // Just add the foreign key constraint
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
            // Drop the foreign key we created
            $table->dropForeign(['quotation_product_id']);
            
            // No need to rename column since it was already quotation_product_id
            // and no original foreign key to recreate
        });
    }
};