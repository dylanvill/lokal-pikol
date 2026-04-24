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
        Schema::disableForeignKeyConstraints();
        
        Schema::dropIfExists('authentication_providers');
        Schema::dropIfExists('block_bookings');
        Schema::dropIfExists('court_pricings');
        Schema::dropIfExists('courts');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('facilities');
        Schema::dropIfExists('onboarding_tokens');
        Schema::dropIfExists('reservation_fees');
        Schema::dropIfExists('reservations');
        Schema::dropIfExists('users');

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
