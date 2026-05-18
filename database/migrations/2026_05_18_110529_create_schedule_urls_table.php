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
        Schema::create('schedule_urls', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->foreignId('listing_id')->constrained()->cascadeOnDelete();
            $table->string('provider');
            $table->json('config');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_urls');
    }
};
