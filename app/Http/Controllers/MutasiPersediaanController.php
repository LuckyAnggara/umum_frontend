<?php

namespace App\Http\Controllers;

use App\Models\MutasiPersediaan;
use Illuminate\Http\Request;

class MutasiPersediaanController extends Controller
{
    static function createMutasi($inventory_id, $tipe, $jumlah, $keterangan)
    {
        // Cari saldo terakhir dari MutasiPersediaan berdasarkan inventory_id
        $lastMutasi = MutasiPersediaan::where('inventory_id', $inventory_id)
            ->orderBy('created_at', 'desc')
            ->first();

        // Hitung saldo baru
        if ($lastMutasi) {
            $saldo = $lastMutasi->saldo + ($tipe == 'DEBIT' ? $jumlah : - ($jumlah));
        } else {
            // Jika ini merupakan mutasi pertama untuk inventory_id tertentu
            $saldo = $tipe == 'DEBIT' ? $jumlah : 0;
        }

        // Buat mutasi baru
        $mutasi = MutasiPersediaan::create([
            'inventory_id' => $inventory_id,
            'debit' => $tipe == 'DEBIT' ? $jumlah : 0,
            'kredit' => $tipe == 'KREDIT' ? $jumlah : 0,
            'saldo' => $saldo,
            'keterangan' => $keterangan,
        ]);

        return $mutasi;
    }
}
