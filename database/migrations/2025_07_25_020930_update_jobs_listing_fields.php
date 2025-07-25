<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('jobs_listing', function (Blueprint $table) {
            // Drop 'description'
            $table->dropColumn('description');

            // Rename 'job_desc' to 'benefit'
            $table->renameColumn('job_desc', 'benefit');
        });
    }

    public function down(): void
    {
        Schema::table('jobs_listing', function (Blueprint $table) {
            // Rollback changes
            $table->text('description');
            $table->renameColumn('benefit', 'job_desc');
        });
    }
};

