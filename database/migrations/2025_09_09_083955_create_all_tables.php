<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Testimoni
        Schema::create('testimoni', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('testimoni');
            $table->integer('rating');
            $table->timestamps();
        });

        // 2. Location
        Schema::create('location', function (Blueprint $table) {
            $table->id();
            $table->double('latitude', 15, 8);
            $table->double('longitude', 15, 8);
            $table->string('link');
            $table->string('name');
            $table->string('address');
            $table->timestamps();
        });

        // 3. Location Footer
        Schema::create('location_footer', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('link');
            $table->timestamps();
        });

        // 4. Company
        Schema::create('company', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('name');
            $table->text('description');
            $table->string('web')->nullable();
            $table->timestamps();
        });

        // 5. Customer
        Schema::create('customer', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->timestamps();
        });

        // 6. Landing Video
        Schema::create('landing_video', function (Blueprint $table) {
            $table->id();
            $table->string('video'); // simpan path/URL video
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimoni');
        Schema::dropIfExists('location');
        Schema::dropIfExists('location_footer');
        Schema::dropIfExists('company');
        Schema::dropIfExists('customer');
        Schema::dropIfExists('landing_video');
    }
};
