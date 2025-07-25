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
        Schema::create('visitor_logs', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address');
            $table->string('user_agent')->nullable();
            $table->string('country')->nullable();
            $table->string('country_code', 2)->nullable();
            $table->string('city')->nullable();
            $table->string('region')->nullable();
            $table->string('referer')->nullable();
            $table->string('page_url');
            $table->string('session_id')->nullable();
            $table->timestamp('visited_at');
            $table->foreignId('blog_id')->nullable()->constrained('blogs')->onDelete('cascade');
            $table->timestamps();
            $table->index(['ip_address', 'visited_at']);
            $table->index(['country', 'visited_at']);
            $table->index('visited_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitor_logs');
    }
};
