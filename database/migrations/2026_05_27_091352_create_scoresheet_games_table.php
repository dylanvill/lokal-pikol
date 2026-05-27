<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scoresheet_games', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('session_id')->constrained('scoresheet_sessions')->cascadeOnDelete();
            $table->foreignId('team_a_player_1_id')->constrained('scoresheet_players');
            $table->foreignId('team_a_player_2_id')->constrained('scoresheet_players');
            $table->unsignedTinyInteger('team_a_score');
            $table->foreignId('team_b_player_1_id')->constrained('scoresheet_players');
            $table->foreignId('team_b_player_2_id')->constrained('scoresheet_players');
            $table->unsignedTinyInteger('team_b_score');
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scoresheet_games');
    }
};
