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
        Schema::table('jobs_listing', function (Blueprint $table) {
          $table->text('job_desc')->after('salary');
    });
}

public function down()
{
    Schema::table('jobs_listing', function (Blueprint $table) {
        $table->dropColumn('job_desc');
    });
    }
};
