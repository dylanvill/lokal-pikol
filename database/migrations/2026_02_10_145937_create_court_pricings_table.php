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
        Schema::create('court_pricings', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->time('start_time');
            $table->time('end_time');
            $table->decimal('price', 8, 2);
            $table->foreignId('court_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_pricings');
    }
};
