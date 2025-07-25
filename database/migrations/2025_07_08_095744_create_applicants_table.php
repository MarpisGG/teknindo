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
        Schema::dropIfExists('applicants'); // drop dulu jika ada

        Schema::create('applicants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('jobs_listing')->onDelete('cascade');
            $table->string('name');
            $table->enum('gender', ['Male', 'Female']);
            $table->string('email');
            $table->string('phone');
            $table->string('education'); // pendidikan terakhir
            $table->string('address');
            $table->string('resume');
            $table->integer('expected_salary')->nullable(); // gaji yang diharapkan
            $table->date('start_date'); // kapan bisa mulai kerja
            $table->enum('status', ['Applied', 'Under Review', 'Interview Scheduled', 'Hired', 'Rejected'])->default('Applied');
            $table->date('applied_at')->default(now());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
