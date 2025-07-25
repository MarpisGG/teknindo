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
    Schema::create('blog_content', function (Blueprint $table) {
        $table->id();
        $table->foreignId('blog_id')->constrained('blogs')->onDelete('cascade');
        $table->enum('type', ['text', 'image']); // tipe konten: text atau image
        $table->text('content')->nullable();     // isi text, jika type = text
        $table->string('image')->nullable();     // path gambar, jika type = image
        $table->integer('order')->default(0);    // urutan konten
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_content');
    }
};
