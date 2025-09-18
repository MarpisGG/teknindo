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
           $table->unsignedBigInteger('quotation_service_id')->nullable()->after('quotation_product_id');
            $table->foreign('quotation_service_id')->references('id')->on('quotation_service')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotation', function (Blueprint $table) {
           $table->dropForeign(['quotation_service_id']);
            $table->dropColumn('quotation_service_id');
        });
    }
};
