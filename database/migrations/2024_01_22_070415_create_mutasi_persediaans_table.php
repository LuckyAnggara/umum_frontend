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
        Schema::create('mutasi_persediaans', function (Blueprint $table) {
            $table->id();
            $table->integer('inventory_id');
            $table->double('debit')->default(0);
            $table->double('kredit')->default(0);
            $table->double('saldo')->default(0);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mutasi_persediaans');
    }
};
