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
        Schema::create('log_permintaan_persediaans', function (Blueprint $table) {
            $table->id();
            $table->integer('permintaan_persediaan_id');
            $table->string('status')->default('ORDER');
            $table->text('catatan')->nullable();
            $table->string('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_permintaan_persediaans');
    }
};
